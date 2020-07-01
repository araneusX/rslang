import { getWordById, downloadNewWords } from '../../../backend/words';
import { getSettings } from '../../../backend/user';
import statistics from '../../../statistics/statistics';

const getNewWords = async (group: number, page: number, countOfWords: number) => {
  const newWords = await downloadNewWords(group, page, countOfWords);
  return newWords.content;
};

localStorage.setItem('typeOfWord', 'mine');

const trainGameCard = async (userId: string, token: string) => {
  const userSettings = await getSettings(userId, token);
  const dayStatistic = statistics.getDayStatistics();
  const progress = new Map(Object.entries(statistics.getProgress()));

  const { wordsPerDay } = userSettings.content;
  const { maxCountCard } = userSettings.content.optional;

  const countOfShowedCards = dayStatistic.cards;
  // const countOfShowedNewWords = dayStatistic.newWords;

  let group: number = 0; // get value from settings
  let startWord: number = Number(progress.get(`${group}`));

  if (startWord === 600) {
    group += 1;
    startWord = 0;
  }
  startWord += 1;

  let newWordsArray = await getNewWords(group, startWord, wordsPerDay);
  const wordId = statistics.getWordId();

  if (wordId === null) {
    const sizeOfNextPack = maxCountCard - countOfShowedCards;
    if (startWord === 600) {
      group += 1;
      startWord = 0;
    }
    startWord += wordsPerDay;
    newWordsArray = newWordsArray.concat(await getNewWords(group, startWord, sizeOfNextPack));
  }

  const typeOfWord = localStorage.getItem('typeOfWord');

  if (typeOfWord === 'mine' && wordId !== null) {
    localStorage.setItem('typeOfWord', 'new');
    return getWordById(wordId);
  }
  if (typeOfWord === 'new' && wordId !== null) {
    localStorage.setItem('typeOfWord', 'mine');
    if (newWordsArray[countOfShowedCards / 2] === undefined) {
      const sizeOfNextPack = maxCountCard - countOfShowedCards;
      if (startWord === 600) {
        group += 1;
        startWord = 0;
      }
      startWord += wordsPerDay;
      newWordsArray = newWordsArray.concat(await getNewWords(group, startWord, sizeOfNextPack));
    }
    return newWordsArray[countOfShowedCards / 2];
  }
  if (wordId === null) {
    localStorage.setItem('typeOfWord', 'new');
    return newWordsArray[countOfShowedCards];
  }
  return true;
};

export default trainGameCard;
