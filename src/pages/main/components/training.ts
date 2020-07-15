/* eslint-disable no-return-await */
import { getWordById, downloadNewWords } from '../../../backend/words';
import { getSettings } from '../../../backend/user';
import statistics from '../../../statistics/statistics';

const getNewWords = async (group: number, page: number, countOfWords: number) => {
  const newWords = await downloadNewWords(group, page, countOfWords);
  return newWords.content;
};

localStorage.setItem('typeOfWord', 'new');

const standartGame = async (group: number, progress: Map<string, unknown>, maxCountCard: number, wordsPerDay: number, countOfShowedCards: number, countOfNewWords: number) => {
  let otherGroup: number = group;
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
  const wordsId: Array<string> = [];
  const allUsersWords: Array<string> = statistics.getAllWordsId();

  deletedWords.forEach((word, i) => {
    wordsId[i] = word.wordId;
  });

  if (wordId === null) {
    const sizeOfNextPack = wordsPerDay - countOfShowedCards;

    if (startWord === 600) {
      otherGroup += 1;
      startWord = 0;
    }
    startWord += maxCountCard;
    newWordsArray = newWordsArray.concat(await getNewWords(otherGroup, startWord, sizeOfNextPack));
    localStorage.setItem('typeOfWord', 'new');

    if (allUsersWords.includes(newWordsArray[countOfShowedCards].id)) {
      newWordsArray = newWordsArray.concat(await getNewWords(otherGroup, startWord + 1, 1));
      return newWordsArray[countOfShowedCards + 1];
    }
    return newWordsArray[countOfShowedCards];
  }

  const typeOfWord = localStorage.getItem('typeOfWord');
  if (typeOfWord === 'mine' && wordId !== null) {
    localStorage.setItem('typeOfWord', 'new');
    let returnedWord = await getWordById(wordId);
    if (wordsId.includes(returnedWord.id)) {
      const otherUserWords = statistics.getAllWordsId();
      returnedWord = await getWordById(otherUserWords[1]);
    }
    return returnedWord;
  }

  if (typeOfWord === 'new' && wordId !== null) {
    localStorage.setItem('typeOfWord', 'mine');
    if (newWordsArray[Math.floor(countOfNewWords)] === undefined) {
      let sizeOfNextPack = wordsPerDay - countOfShowedCards;
      if (sizeOfNextPack < countOfNewWords) sizeOfNextPack = countOfNewWords;
      if (startWord === 600) {
        otherGroup += 1;
        startWord = 0;
      }
      startWord += maxCountCard;
      newWordsArray = newWordsArray.concat(await getNewWords(otherGroup, startWord, sizeOfNextPack));
    }
    if (wordsId.includes(newWordsArray[countOfNewWords].id)) {
      return newWordsArray[countOfNewWords + 1];
    }
    if (allUsersWords.includes(newWordsArray[countOfNewWords].id)) {
      newWordsArray = newWordsArray.concat(await getNewWords(otherGroup, startWord + 1, 1));
      return newWordsArray[countOfNewWords + 1];
    }
    return newWordsArray[countOfNewWords];
  }
  return true;
};

localStorage.setItem('counterOfUsersWords', '0');

const forRepeatGame = async (wordsPerDay: number, maxCountCard: number) => {
  const sizeOfUsersWordsPack = Math.abs(wordsPerDay - maxCountCard);
  const wordId = statistics.getWordId();

  const allUsersWords: Array<string> = statistics.getAllWordsId();

  const deletedWords = statistics.getAllWordsStatisticsWithDeleted();
  const wordsId: Array<string> = [];
  deletedWords.forEach((word, i) => {
    wordsId[i] = word.wordId;
  });

  let counterOfUsersWords = Number(localStorage.getItem('counterOfUsersWords'));

  if (wordId === null) {
    localStorage.setItem('counterOfUsersWords', '0');
    return null;
  }
  if ((counterOfUsersWords < sizeOfUsersWordsPack) && (wordId !== null)) {
    counterOfUsersWords += 1;
    localStorage.setItem('counterOfUsersWords', `${counterOfUsersWords}`);
    let returnedWord = await getWordById(wordId);

    if (wordsId.includes(returnedWord.id)) {
      const otherUserWords = statistics.getAllWordsId();
      returnedWord = await getWordById(otherUserWords[1]);
    }
    return returnedWord;
  }
  if ((counterOfUsersWords >= sizeOfUsersWordsPack) && (wordId !== null)) {
    localStorage.setItem('counterOfUsersWords', '0');
    return null;
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
  if (index >= difficultUserWords.length) {
    localStorage.setItem('showedDifficultWord', '0');
    return null;
  }
  const returnedWord = getWordById(wordsId[index]);
  if (returnedWord !== undefined) {
    index += 1;
    localStorage.setItem('showedDifficultWord', `${index}`);
    return returnedWord;
  }
  localStorage.setItem('showedDifficultWord', '0');
  return null;
};

localStorage.setItem('showedNewWord', '0');

const newWordsGame = async (group: number, progress: Map<string, unknown>, maxCountCard: number, countOfShowedCards: number) => {
  let otherGroup: number = group;
  let startWord: number = Number(progress.get(`${otherGroup}`));
  if (startWord === 600) {
    otherGroup += 1;
    startWord = 0;
  }
  startWord += 1;
  let index = Number(localStorage.getItem('showedNewWord'));

  const deletedWords = statistics.getAllWordsStatisticsWithDeleted();
  const wordsId: Array<string> = [];
  deletedWords.forEach((word, i) => {
    wordsId[i] = word.wordId;
  });

  const allUsersWords: Array<string> = statistics.getAllWordsId();

  let newWordsArray = await getNewWords(otherGroup, startWord, maxCountCard);

  if ((newWordsArray[index] === undefined) || (newWordsArray[index + 1] === undefined)) {
    localStorage.setItem('showedNewWord', '0');
    return null;
  }

  if (wordsId.includes(newWordsArray[index].id)) {
    if (allUsersWords.includes(newWordsArray[index + 1].id)) {
      newWordsArray = newWordsArray.concat(await getNewWords(otherGroup, startWord + 1, 1));
      index += 2;
      localStorage.setItem('showedNewWord', `${index}`);
      return newWordsArray[index];
    }
    return newWordsArray[index + 1];
  }

  if (allUsersWords.includes(newWordsArray[index].id)) {
    newWordsArray = newWordsArray.concat(await getNewWords(otherGroup, startWord + 1, 1));
    index += 1;
    localStorage.setItem('showedNewWord', `${index}`);
    return newWordsArray[index];
  }

  const returnedWord = newWordsArray[index];

  if (returnedWord !== undefined) {
    index += 1;
    localStorage.setItem('showedNewWord', `${index}`);
    return returnedWord;
  }
  if (returnedWord === undefined) {
    localStorage.setItem('showedNewWord', '0');
    return null;
  }
  return true;
};

const trainGameCard = async (userId: string, token: string, typeOfGame: string) => {
  const userSettings = await getSettings(userId, token);
  const dayStatistic = statistics.getDayStatistics();
  const progress = new Map(Object.entries(statistics.getProgress()));

  const group = userSettings.content.optional.level;
  const { wordsPerDay } = userSettings.content;
  const { maxCountCard } = userSettings.content.optional;

  const countOfShowedCards = dayStatistic.cards;
  const countOfNewWords = dayStatistic.newWords;

  switch (typeOfGame) {
    case 'new':
      return await newWordsGame(group, progress, maxCountCard, countOfShowedCards);
    case 'repeat':
      return await forRepeatGame(maxCountCard, wordsPerDay);
    case 'difficult':
      return difficultGame();
    default: {
      return await standartGame(group, progress, maxCountCard, wordsPerDay, countOfShowedCards, countOfNewWords);
    }
  }
};

export default trainGameCard;
