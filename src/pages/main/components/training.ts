import { getWordById, downloadNewWords } from '../../../backend/words';
import { getSettings } from '../../../backend/user';
import statistics from '../../../statistics/statistics';

const getNewWords = async (group: number, page: number, countOfWords: number) => {
  const newWords = await downloadNewWords(group, page, countOfWords);
  return newWords.content;
};

/* localStorage.setItem('wordsCounter', '0');
localStorage.setItem('trainNewWords', '[]');

const training = async (userId: string, token: string) => {
  const userSettings = await getSettings(userId, token);
  const { wordsPerDay } = userSettings.content;
  const { maxCountCard } = userSettings.content.optional;
  const dayStatistic = statistics.getDayStatistics();
  const countOfShowedCards = dayStatistic.cards;
  const indexOfNewWord = dayStatistic.newWords;

  let newWords = (await downloadNewWords(0, 0, wordsPerDay)).content;

  const wordId = statistics.getWordId();
  let counter = Number(localStorage.getItem('wordsCounter'));
  if (wordId === null) {
    newWords = getAnotherNewWords(maxCountCard, countOfShowedCards, newWords);
    console.log(newWords[indexOfNewWord + counter]);
    counter += 1;
    localStorage.setItem('wordsCounter', counter.toString());
  } else {
    if (counter !== maxCountCard && counter % 2 !== 0) {
      console.log(getWordById(wordId));
      counter += 1;
      localStorage.setItem('wordsCounter', counter.toString());
    }
    if (counter !== maxCountCard && counter % 2 === 0) {
      console.log(newWords[indexOfNewWord]);
      counter += 1;
      localStorage.setItem('wordsCounter', counter.toString());
    }
  }
}; */

localStorage.setItem('typeOfWord', 'mine');

const trainGameCard = async (userId: string, token: string) => {
  const userSettings = await getSettings(userId, token);
  const { wordsPerDay } = userSettings.content;
  const { maxCountCard } = userSettings.content.optional;
  const dayStatistic = statistics.getDayStatistics();
  const countOfShowedCards = dayStatistic.cards;

  let newWordsArray = await getNewWords(0, 0, wordsPerDay);
  console.log(newWordsArray);
  const wordId = statistics.getWordId();
  if (wordId === null) {
    const sizeOfNextPack = maxCountCard - countOfShowedCards;
    newWordsArray = newWordsArray.concat(await getNewWords(0, 0, sizeOfNextPack));
  }

  const typeOfWord = localStorage.getItem('typeOfWord');
  if (typeOfWord === 'mine' && wordId !== null) {
    localStorage.setItem('typeOfWord', 'new');
    return getWordById(wordId);
  }
  if (typeOfWord === 'new' && wordId !== null) {
    localStorage.setItem('typeOfWord', 'mine');
    return newWordsArray[countOfShowedCards]; // countOfShowedCards - 1
  }
  if (wordId === null) {
    localStorage.setItem('typeOfWord', 'new');
    return newWordsArray[countOfShowedCards];
  }
  return true;
};

export default trainGameCard;
