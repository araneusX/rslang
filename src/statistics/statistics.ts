import {
  StatisticsInterface,
  UserStatisticsInterface,
  WordStatisticsInterface
} from '../types';
import { uploadWordStatistics, updateWordStatistics, downloadAllWordsStatistics } from '../backend/words';
import { createIdFromDate, getFormattedDate, createDayStatisticsObject } from '../utils';
import { setUserStatistics, getUserStatistics } from '../backend/user';
import { initialUserStatisticsObject, initialDayStatisticsObject, initialWordStatisticsObject } from '../constants';

const statistics: StatisticsInterface = {
  progress: {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0
  },
  days: {},
  miniGames: {
    speakit: {},
    puzzle: {},
    savannah: {},
    audiochallenge: {},
    sprint: {},
    our: {}
  },
  series: 0,
  userId: '',
  token: '',
  isInit: false,
  userWords: [],
  userWordsId: {},

  getProgress() {
    return { ...this.progress };
  },

  getDayStatistics() {
    const nowKey = createIdFromDate();
    if (!this.days[nowKey]) {
      this.days[nowKey] = createDayStatisticsObject();
    }
    return this.days[nowKey];
  },

  getAllDayStatistics() {
    const nowKey = createIdFromDate();
    if (!this.days[nowKey]) {
      this.days[nowKey] = createDayStatisticsObject();
    }
    const days = Object.values(this.days);
    return days.reduce((acc, i) => (
      {
        cards: acc.cards + i.cards,
        date: acc.date < i.date ? acc.date : i.date,
        newWords: acc.newWords + i.newWords,
        right: acc.right + i.right,
        series: acc.series < i.right ? i.right : acc.series
      }
    ));
  },

  getForEachDayStatistics() {
    const nowKey = createIdFromDate();
    if (!this.days[nowKey]) {
      this.days[nowKey] = createDayStatisticsObject();
    }
    const days = Object.keys(this.days);
    return days.map((i) => this.days[i]).sort((a, b) => (a.date < b.date ? -1 : 1));
  },

  async saveMini(name, result) {
    if (result > 0) {
      const dateKey = getFormattedDate();
      if (!this.miniGames[name][dateKey]) {
        this.miniGames[name][dateKey] = [];
      }
      this.miniGames[name][dateKey].push(result);
      const userStatistics: UserStatisticsInterface = {
        days: this.days,
        progress: this.progress,
        miniGames: this.miniGames
      };
      const statisticsRes = await setUserStatistics(this.userId, this.token, userStatistics);

      if (!statisticsRes.ok) {
        return { ok: false };
      }
    }

    return { ok: true };
  },

  getMini(name) {
    const results = this.miniGames[name];
    const dates = Object.keys(results);
    const resultsArr = dates.map((date) => ({ date, results: results[date] }));
    return resultsArr;
  },

  async toggleParams(param: string, wordId: string) {
    let isNewWord = false;
    if (!this.userWordsId[wordId]) {
      this.userWordsId[wordId] = { ...initialWordStatisticsObject };
      this.userWordsId[wordId].wordId = wordId;
      this.userWords.push(this.userWordsId[wordId]);
      isNewWord = true;
    }

    switch (param) {
      case 'difficulty': this.userWordsId[wordId].isDifficult = !this.userWordsId[wordId].isDifficult;
        break;
      case 'deleted': this.userWordsId[wordId].isDeleted = !this.userWordsId[wordId].isDeleted;
        break;
      default:
    }

    const objectToSave = { ...this.userWordsId[wordId] };
    let result: any;
    if (isNewWord) {
      result = await uploadWordStatistics(this.userId, this.token, objectToSave);
    } else {
      result = await updateWordStatistics(this.userId, this.token, objectToSave);
    }
    return { status: result.ok ? 'ok' : 'error', ok: result.ok };
  },

  async toggleDifficult(wordId) {
    const result = await this.toggleParams('difficulty', wordId);
    return { status: result.ok ? 'ok' : 'error', ok: result.ok };
  },

  async toggleDeleted(wordId) {
    const result = await this.toggleParams('deleted', wordId);
    return { status: result.ok ? 'ok' : 'error', ok: result.ok };
  },

  async saveWord(wordId, isRight, difficulty, group) {
    let isNewWord = false;
    if (!this.userWordsId[wordId]) {
      this.userWordsId[wordId] = { ...initialWordStatisticsObject };
      this.userWordsId[wordId].wordId = wordId;
      this.userWords.push(this.userWordsId[wordId]);

      this.progress[group] += 1;
      isNewWord = true;
    }

    if (isRight) {
      this.userWordsId[wordId].allRight += 1;
      this.userWordsId[wordId].lastRight = getFormattedDate();
      this.userWordsId[wordId].continuedRight += 1;
      this.userWordsId[wordId].interval += 1;
      this.series += 1;
    } else {
      this.userWordsId[wordId].continuedRight = 0;
      this.series = 0;
    }

    if (this.userWordsId[wordId].maxContinuedRight < this.userWordsId[wordId].continuedRight) {
      this.userWordsId[wordId].maxContinuedRight = this.userWordsId[wordId].continuedRight;
    }

    this.userWordsId[wordId].allShow += 1;
    this.userWordsId[wordId].interval += (3 - difficulty);

    const key = createIdFromDate();

    if (!this.days[key]) {
      this.days[key] = createDayStatisticsObject();
      const userStatistics = { ...initialUserStatisticsObject } as UserStatisticsInterface;
      userStatistics.days[key] = this.days[key];
    }

    this.days[key].cards += 1;
    this.days[key].right += isRight ? 1 : 0;
    this.days[key].newWords += isNewWord ? 1 : 0;

    if (this.days[key].series < this.series) {
      this.days[key].series = this.series;
    }

    const userStatistics: UserStatisticsInterface = {
      days: this.days,
      progress: this.progress,
      miniGames: this.miniGames
    };
    const statisticsRes = await setUserStatistics(this.userId, this.token, userStatistics);

    if (!statisticsRes.ok) {
      return { ok: false };
    }

    const objectToSave = { ...this.userWordsId[wordId] };

    if (isNewWord) {
      const result = await uploadWordStatistics(this.userId, this.token, objectToSave);
      return { ok: result.ok };
    }

    const result = await updateWordStatistics(this.userId, this.token, objectToSave);
    return { ok: result.ok };
  },

  async saveWordMini(wordId, isRight) {
    if (this.userWordsId[wordId]) {
      this.userWordsId[wordId].interval += 1;
      if (isRight) {
        this.userWordsId[wordId].interval += 1;
      }
      const objectToSave = { ...this.userWordsId[wordId] };
      const result = await updateWordStatistics(this.userId, this.token, objectToSave);
      return { ok: result.ok };
    }
    return { ok: true };
  },

  getAllWordsStatistics() {
    const words = this.userWords
      .filter((word) => (!word.isDeleted && word.isCorrect))
      .sort((a, b) => (a.interval - b.interval));
    return words;
  },

  getWordStatistics() {
    const words = this.userWords.filter((wordObj) => (!wordObj.isDeleted && wordObj.isCorrect));
    const word = words.length > 0
      ? words.reduce((acc, wordObj) => (acc.interval > wordObj.interval ? wordObj : acc))
      : null;
    return word;
  },

  getAllWordsId() {
    const wordIds = this.userWords
      .filter((word) => (!word.isDeleted && word.isCorrect))
      .sort((a, b) => (a.interval - b.interval))
      .map((word) => word.wordId);
    return wordIds;
  },

  getWordId() {
    const words = this.userWords.filter((wordObj) => (!wordObj.isDeleted && wordObj.isCorrect));
    const wordId = words.length > 0
      ? words.reduce((acc, wordObj) => (acc.interval > wordObj.interval ? wordObj : acc)).wordId
      : null;
    return wordId;
  },

  async initUser(userId, token) {
    this.isInit = this.userId === userId;
    this.userId = userId;
    this.token = token;
    if (!this.isInit) {
      const key = createIdFromDate();
      this.progress = {
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0
      };
      this.miniGames = {
        speakit: {},
        puzzle: {},
        savannah: {},
        audiochallenge: {},
        sprint: {},
        our: {}
      };
      this.days[key] = initialDayStatisticsObject;
      this.days[key].date = getFormattedDate();
      this.series = 0;
      const statisticsData:any = await getUserStatistics(userId, token);
      if (statisticsData.status === 404) {
        const userStatistics: UserStatisticsInterface = {
          days: this.days,
          progress: this.progress,
          miniGames: this.miniGames
        };
        const statisticsRes = await setUserStatistics(this.userId, this.token, userStatistics);
        return { ok: statisticsRes.ok };
      }

      if (!statisticsData.ok) {
        return { ok: false };
      }

      const allSavedWords = await downloadAllWordsStatistics(this.userId, this.token);

      if (!allSavedWords.ok) {
        return { ok: false };
      }

      this.userWords = allSavedWords.content
        .map((word: WordStatisticsInterface) => {
          if (word && word.isCorrect) {
            return word;
          }
          const wordObj: WordStatisticsInterface = { ...initialWordStatisticsObject };
          wordObj.isCorrect = false;
          wordObj.wordId = word.wordId;
          return wordObj;
        });

      const wordIds = this.userWords.map((word: WordStatisticsInterface) => word.wordId);
      wordIds.forEach((wordId, i) => {
        this.userWordsId[wordId] = this.userWords[i];
      });

      const userStatistics = statisticsData.statistics as UserStatisticsInterface;
      this.progress = userStatistics.progress;
      this.days = userStatistics.days;
      this.miniGames = userStatistics.miniGames;

      const nowKey = createIdFromDate();
      if (!this.days[nowKey]) {
        this.days[nowKey] = createDayStatisticsObject();
      }
    }
    return { ok: true };
  }
};

export default statistics;
