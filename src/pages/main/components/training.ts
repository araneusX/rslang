/* eslint-disable no-return-await */
import { getWordById, downloadNewWords } from '../../../backend/words';
import { getSettings } from '../../../backend/user';
import statistics from '../../../statistics/statistics';

const getNewWords = async (group: number, page: number, countOfWords: number) => {
  const newWords = await downloadNewWords(group, page, countOfWords);
  return newWords.content;
};

localStorage.setItem('typeOfWord', 'new');

const standartGame = async (progress: Map<string, unknown>, maxCountCard: number, wordsPerDay: number, countOfShowedCards: number) => {
  let group: number = 0; // get value from settings
  let startWord: number = Number(progress.get(`${group}`));

  if (startWord === 600) {
    group += 1;
    startWord = 0;
  }
  startWord += 1;
  let newWordsArray = await getNewWords(group, startWord, maxCountCard);
  const wordId = statistics.getWordId();

  if (wordId === null) {
    const sizeOfNextPack = wordsPerDay - countOfShowedCards;
    if (startWord === 600) {
      group += 1;
      startWord = 0;
    }
    startWord += maxCountCard;
    newWordsArray = newWordsArray.concat(await getNewWords(group, startWord, sizeOfNextPack));
  }

  const typeOfWord = localStorage.getItem('typeOfWord');
  if (typeOfWord === 'mine' && wordId !== null) {
    localStorage.setItem('typeOfWord', 'new');
    return getWordById(wordId);
  }
  if (typeOfWord === 'new' && wordId !== null) {
    localStorage.setItem('typeOfWord', 'mine');
    if (newWordsArray[Math.floor(countOfShowedCards / 2)] === undefined) {
      const sizeOfNextPack = wordsPerDay - countOfShowedCards;
      if (startWord === 600) {
        group += 1;
        startWord = 0;
      }
      startWord += maxCountCard;
      newWordsArray = newWordsArray.concat(await getNewWords(group, startWord, sizeOfNextPack));
    }
    console.log(newWordsArray);
    return newWordsArray[Math.floor(countOfShowedCards / 2)];
  }
  if (wordId === null) {
    localStorage.setItem('typeOfWord', 'new');
    return newWordsArray[countOfShowedCards];
  }
  return true;
};

const forRepeatGame = async (progress: Map<string, unknown>, wordsPerDay: number, maxCountCard: number, countOfShowedCards: number) => {
  let group: number = 0; // get value from settings
  let startWord: number = Number(progress.get(`${group}`));

  if (startWord === 600) {
    group += 1;
    startWord = 0;
  }
  startWord += 1;
  let newWordsArray = await getNewWords(group, startWord, maxCountCard);

  const sizeOfUsersWordsPack = wordsPerDay - maxCountCard;
  const wordId = statistics.getWordId();

  let counterOfUsersWords = 0;
  let counterOfNewWords = 0;

  if (wordId === null) {
    const sizeOfNextPack = wordsPerDay - countOfShowedCards;
    if (startWord === 600) {
      group += 1;
      startWord = 0;
    }
    startWord += maxCountCard;
    newWordsArray = newWordsArray.concat(await getNewWords(group, startWord, sizeOfNextPack));
    return newWordsArray[countOfShowedCards];
  }
  if ((counterOfUsersWords < sizeOfUsersWordsPack) && (wordId !== null)) {
    counterOfUsersWords += 1;
    return getWordById(wordId);
  }
  if ((counterOfUsersWords > sizeOfUsersWordsPack) && (wordId !== null)) {
    counterOfNewWords += 1;
    return newWordsArray[counterOfNewWords - 1];
  }
  return true;
};

localStorage.setItem('showedDeletedWord', '0');

const difficultGame = () => {
  const difficultUserWords = statistics.getAllWordsStatistics('difficult');
  const wordsId: Array<string> = [];
  difficultUserWords.forEach((word, i) => {
    wordsId[i] = word.wordId;
  });
  let index = Number(localStorage.getItem('showedDeletedWord'));
  const returnedWord = getWordById(wordsId[index]);
  index += 1;
  localStorage.setItem('showedDeletedWord', `${index}`);
  return returnedWord;
};

// typeOfGame = 'standart' | 'difficult' | 'forRepeat'
const trainGameCard = async (userId: string, token: string, typeOfGame: string) => {
  const userSettings = await getSettings(userId, token);
  const dayStatistic = statistics.getDayStatistics();
  const progress = new Map(Object.entries(statistics.getProgress()));

  const { wordsPerDay } = userSettings.content;
  const { maxCountCard } = userSettings.content.optional;

  const countOfShowedCards = dayStatistic.cards;

  switch (typeOfGame) {
    case 'forRepeat':
      return await forRepeatGame(progress, maxCountCard, wordsPerDay, countOfShowedCards);
    case 'difficult':
      return difficultGame();
    default: {
      return await standartGame(progress, maxCountCard, wordsPerDay, countOfShowedCards);
    }
  }
};

export default trainGameCard;
