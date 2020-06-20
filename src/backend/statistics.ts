import {
  StatisticsInterface,
  UserStatisticsInterface
} from '../types';
import { uploadWordStatistics, updateWordStatistics } from './words';
import { createIdFromDate, getFormattedDate } from '../utils';
import { uploadUserStatistics, downloadUserStatistics } from './user';
import { initialUserStatisticsObject, initialDayStatisticsObject } from '../constants';

const statistics: StatisticsInterface = {
  levelWords: [0, 0, 0, 0, 0, 0],
  days: {},
  series: 0,

  getDayStatistics() {
    return this.days[createIdFromDate()];
  },

  getAllDayStatistics() {
    const days = Object.values(this.days);
    return days.reduce((acc, i) => (
      {
        cards: acc.cards + i.cards,
        date: acc.date + i.date,
        newWords: acc.newWords + i.newWords,
        right: acc.right + i.right,
        series: acc.series < i.right ? i.right : acc.series
      }
    ));
  },

  async toggleDeleted(wordStatistics, userId, token) {
    const newWordStatistics = wordStatistics;
    newWordStatistics.isDeleted = !wordStatistics.isDeleted;
    if (wordStatistics.isNew) {
      const data: any = (await uploadWordStatistics(userId, token, newWordStatistics));
      return { status: data.ok ? 'ok' : 'error', ok: data.ok };
    }
    const data: any = await updateWordStatistics(userId, token, newWordStatistics);
    return { status: data.ok ? 'ok' : 'error', ok: data.ok };
  },

  async toggleDifficult(wordStatistics, userId, token) {
    const newWordStatistics = wordStatistics;
    newWordStatistics.isDifficult = !wordStatistics.isDifficult;
    if (wordStatistics.isNew) {
      const data: any = await uploadWordStatistics(userId, token, newWordStatistics);
      return { status: data.ok ? 'ok' : 'error', ok: data.ok };
    }
    const data: any = await updateWordStatistics(userId, token, newWordStatistics);
    return { status: data.ok ? 'ok' : 'error', ok: data.ok };
  },

  async saveWord(wordStatistics, difficulty, isRight, userId, token) {
    const newWordStatistics = wordStatistics;
    newWordStatistics.isNew = false;
    newWordStatistics.difficulty = difficulty;
    if (isRight) {
      newWordStatistics.allRight += 1;
      newWordStatistics.lastRight = getFormattedDate();
      newWordStatistics.continuedRight += 1;
      this.series += 1;
    } else {
      newWordStatistics.continuedRight = 0;
      this.series = 0;
    }

    const key = createIdFromDate();

    if (!this.days[key]) {
      this.days[key] = initialDayStatisticsObject;
      this.days[key].date = getFormattedDate();
      const userStatistics = { ...initialUserStatisticsObject } as UserStatisticsInterface;
      userStatistics.days[key] = this.days[key];
    }

    this.days[key].cards += 1;
    this.days[key].newWords += 1;
    this.days[key].right += isRight ? 1 : 0;
    if (this.days[key].series < this.series) {
      this.days[key].series = this.series;
    }

    const userStatistics: UserStatisticsInterface = {
      days: this.days,
      levelWords: this.levelWords
    };
    await uploadUserStatistics(userId, token, userStatistics);
    if (wordStatistics.isNew) {
      const data = await uploadWordStatistics(userId, token, newWordStatistics);
      return { ok: data.ok };
    }
    const data = await updateWordStatistics(userId, token, newWordStatistics);
    return { ok: data.ok };
  },

  async init(userId, token) {
    const statisticsData:any = await downloadUserStatistics(userId, token);
    if (!statisticsData.ok) {
      return { ok: false };
    }
    const userStatistics = statisticsData.statistics as UserStatisticsInterface;
    this.levelWords = userStatistics.levelWords;
    this.days = userStatistics.days;
    return { ok: true };
  }
};

export default statistics;
