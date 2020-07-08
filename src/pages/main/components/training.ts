/* eslint-disable no-return-await */
import { getWordById, downloadNewWords } from '../../../backend/words';
import { getSettings } from '../../../backend/user';
import statistics from '../../../statistics/statistics';

const getNewWords = async (group: number, page: number, countOfWords: number) => {
  const newWords = await downloadNewWords(group, page, countOfWords);
  return newWords.content;
};

localStorage.setItem('typeOfWord', 'new');

const standartGame = async (group: number, progress: Map<string, unknown>, maxCountCard: number, wordsPerDay: number, countOfShowedCards: number) => {
  let otherGroup: number = group; // get value from settings
  let startWord: number = Number(progress.get(`${group}`));

  if (startWord === 600) {
    otherGroup += 1;
    startWord = 0;
  }
  startWord += 1;
  let newWordsArray = await getNewWords(otherGroup, startWord, maxCountCard);
  if (newWordsArray === undefined) return null;
  const wordId = statistics.getWordId();

  const deletedWords = statistics.getAllWordsStatisticsWithDeleted();

  if (wordId === null) {
    const sizeOfNextPack = wordsPerDay - countOfShowedCards;
    if (startWord === 600) {
      otherGroup += 1;
      startWord = 0;
    }
    startWord += maxCountCard;
    newWordsArray = newWordsArray.concat(await getNewWords(otherGroup, startWord, sizeOfNextPack));
    if (newWordsArray === undefined) return null;
  }

  const typeOfWord = localStorage.getItem('typeOfWord');
  if (typeOfWord === 'mine' && wordId !== null) {
    localStorage.setItem('typeOfWord', 'new');
    const returnedWord = await getWordById(wordId);
    if (deletedWords.includes(returnedWord)) {
      const otherUserWords = statistics.getAllWordsId();
      return otherUserWords[1];
    }
    return returnedWord;
  }

  if (typeOfWord === 'new' && wordId !== null) {
    localStorage.setItem('typeOfWord', 'mine');
    if (newWordsArray[Math.floor(countOfShowedCards / 2)] === undefined) {
      const sizeOfNextPack = wordsPerDay - countOfShowedCards;
      if (startWord === 600) {
        otherGroup += 1;
        startWord = 0;
      }
      startWord += maxCountCard;
      newWordsArray = newWordsArray.concat(await getNewWords(otherGroup, startWord, sizeOfNextPack));
    }
    if (newWordsArray === undefined || newWordsArray[Math.floor(countOfShowedCards / 2)] === undefined) return null;
    return newWordsArray[Math.floor(countOfShowedCards / 2)];
  }

  if (wordId === null) {
    localStorage.setItem('typeOfWord', 'new');
    if (newWordsArray[countOfShowedCards] === undefined) return null;
    return newWordsArray[countOfShowedCards];
  }

  return true;
};

const forRepeatGame = async (group: number, progress: Map<string, unknown>, wordsPerDay: number, maxCountCard: number, countOfShowedCards: number) => {
  let otherGroup: number = group; // get value from settings
  let startWord: number = Number(progress.get(`${group}`));

  if (startWord === 600) {
    otherGroup += 1;
    startWord = 0;
  }
  startWord += 1;

  const sizeOfUsersWordsPack = wordsPerDay - maxCountCard;
  const wordId = statistics.getWordId();

  const deletedWords = statistics.getAllWordsStatisticsWithDeleted();

  let newWordsArray = await getNewWords(otherGroup, startWord, maxCountCard);
  if (newWordsArray === undefined) return null;
  let counterOfUsersWords = 0;
  let counterOfNewWords = 0;

  if (wordId === null) {
    const sizeOfNextPack = wordsPerDay - countOfShowedCards;
    if (startWord === 600) {
      otherGroup += 1;
      startWord = 0;
    }
    startWord += maxCountCard;
    newWordsArray = newWordsArray.concat(await getNewWords(otherGroup, startWord, sizeOfNextPack));
    return newWordsArray[countOfShowedCards];
  }
  if ((counterOfUsersWords < sizeOfUsersWordsPack) && (wordId !== null)) {
    counterOfUsersWords += 1;
    const returnedWord = await getWordById(wordId);
    if (deletedWords.includes(returnedWord)) {
      const otherUserWords = statistics.getAllWordsId();
      return otherUserWords[1];
    }
    return returnedWord;
  }
  if ((counterOfUsersWords > sizeOfUsersWordsPack) && (wordId !== null)) {
    counterOfNewWords += 1;
    if (newWordsArray[counterOfNewWords - 1] === undefined) return null;
    return newWordsArray[counterOfNewWords - 1];
  }
  return true;
};

localStorage.setItem('showedDifficultWord', '0');

const difficultGame = () => {
  const difficultUserWords = statistics.getAllWordsStatistics('difficult');
  const wordsId: Array<string> = [];
  difficultUserWords.forEach((word, i) => {
    wordsId[i] = word.wordId;
  });
  let index = Number(localStorage.getItem('showedDifficultWord'));
  const returnedWord = getWordById(wordsId[index]);
  if (returnedWord !== undefined) {
    index += 1;
    localStorage.setItem('showedDifficultWord', `${index}`);
    return returnedWord;
  } return null;
};

const newWordsGame = async (group: number, progress: Map<string, unknown>, maxCountCard: number, countOfShowedCards: number) => {
  let startWord: number = Number(progress.get(`${group}`));
  let otherGroup: number = group;
  if (startWord === 600) {
    otherGroup += 1;
    startWord = 0;
  }
  startWord += 1;

  const newWordsArray = await getNewWords(otherGroup, startWord, maxCountCard);
  // if (newWordsArray === undefined || newWordsArray[countOfShowedCards] === undefined) return null;
  console.log(newWordsArray);
  console.log(newWordsArray[countOfShowedCards]);
  return newWordsArray[countOfShowedCards];
};

// typeOfGame = 'basic' | 'difficult' | 'repeat' | 'new'
const trainGameCard = async (userId: string, token: string, typeOfGame: string) => {
  const userSettings = await getSettings(userId, token);
  const dayStatistic = statistics.getDayStatistics();
  const progress = new Map(Object.entries(statistics.getProgress()));

  const group = userSettings.content.optional.level;
  const { wordsPerDay } = userSettings.content;
  const { maxCountCard } = userSettings.content.optional;

  const countOfShowedCards = dayStatistic.cards;

  switch (typeOfGame) {
    case 'new':
      return await newWordsGame(group, progress, wordsPerDay, countOfShowedCards);
    case 'repeat':
      return await forRepeatGame(group, progress, maxCountCard, wordsPerDay, countOfShowedCards);
    case 'difficult':
      return difficultGame();
    default: {
      return await standartGame(group, progress, maxCountCard, wordsPerDay, countOfShowedCards);
    }
  }
};

export default trainGameCard;
