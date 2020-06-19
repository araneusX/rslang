import {
  StatisticsInterface,
  UserStatisticsInterface
} from '../types';
import { uploadWordStatistics, updateWordStatistics } from './words';
import { getFormattedDate } from '../utils';
import { uploadUserStatistics, downloadUserStatistics } from './user';
import { initialUserStatisticsObject, initialDayStatisticsObject } from '../constants';

const statistics: StatisticsInterface = {
  levelWords: [0, 0, 0, 0, 0, 0],
  days: {},
  series: 0,

  getDayStatistics() {
    return this.days[getFormattedDate()];
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
      const data: any = (await uploadWordStatistics(newWordStatistics, userId, token));
      return { status: data.ok ? 'ok' : 'error', ok: data.ok };
    }
    const data: any = await updateWordStatistics(newWordStatistics, userId, token);
    return { status: data.ok ? 'ok' : 'error', ok: data.ok };
  },

  async toggleDifficult(wordStatistics, userId, token) {
    const newWordStatistics = wordStatistics;
    newWordStatistics.isDifficult = !wordStatistics.isDifficult;
    if (wordStatistics.isNew) {
      const data: any = await uploadWordStatistics(newWordStatistics, userId, token);
      return { status: data.ok ? 'ok' : 'error', ok: data.ok };
    }
    const data: any = await updateWordStatistics(newWordStatistics, userId, token);
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

    const key = getFormattedDate();
    if (this.days[key]) {
      this.days[key].cards += 1;
      this.days[key].newWords += 1;
      this.days[key].right += isRight ? 1 : 0;
      if (this.days[key].series < this.series) {
        this.days[key].series = this.series;
      }
    }

    const userStatistics: UserStatisticsInterface = {
      days: this.days,
      levelWords: this.levelWords
    };
    await uploadUserStatistics(userId, token, userStatistics);
    if (wordStatistics.isNew) {
      const data = await uploadWordStatistics(newWordStatistics, userId, token);
      return { ok: data.ok };
    }
    const data = await updateWordStatistics(newWordStatistics, userId, token);
    return { ok: data.ok };
  },

  async init(userId, token) {
    const statisticsData:any = await downloadUserStatistics(userId, token);
    if (!(statisticsData.ok && statisticsData.statistics.levelWords)) {
      const dateKey = getFormattedDate();
      this.days[dateKey] = initialDayStatisticsObject;
      this.days[dateKey].date = dateKey;
      const userStatistics = { ...initialUserStatisticsObject } as UserStatisticsInterface;
      userStatistics.days[dateKey] = this.days[dateKey];
      const status = await uploadUserStatistics(userId, token, userStatistics);
      return { ok: status.ok };
    }

    const userStatistics = statisticsData.statistics as UserStatisticsInterface;
    this.levelWords = userStatistics.levelWords;
    this.days = userStatistics.days;
    return { ok: true };
  }
};

export default statistics;
