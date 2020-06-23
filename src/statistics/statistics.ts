import {
  StatisticsInterface,
  UserStatisticsInterface
} from '../types';
import { uploadWordStatistics, updateWordStatistics } from '../backend/words';
import { createIdFromDate, getFormattedDate } from '../utils';
import { setUserStatistics, getUserStatistics } from '../backend/user';
import { initialUserStatisticsObject, initialDayStatisticsObject } from '../constants';

const statistics: StatisticsInterface = {
  levelWords: [0, 0, 0, 0, 0, 0],
  days: {},
  series: 0,
  userId: '',
  token: '',
  isInit: false,

  getDayStatistics() {
    return this.days[createIdFromDate()];
  },

  getAllDayStatistics() {
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

  async toggleDeleted(wordStatistics) {
    const newWordStatistics = wordStatistics;
    newWordStatistics.isDeleted = !wordStatistics.isDeleted;
    if (wordStatistics.isNew) {
      const data: any = (await uploadWordStatistics(this.userId, this.token, newWordStatistics));
      return { status: data.ok ? 'ok' : 'error', ok: data.ok };
    }
    const data: any = await updateWordStatistics(this.userId, this.token, newWordStatistics);
    return { status: data.ok ? 'ok' : 'error', ok: data.ok };
  },

  async toggleDifficult(wordStatistics) {
    const newWordStatistics = wordStatistics;
    newWordStatistics.isDifficult = !wordStatistics.isDifficult;
    if (wordStatistics.isNew) {
      const data: any = await uploadWordStatistics(this.userId, this.token, newWordStatistics);
      return { status: data.ok ? 'ok' : 'error', ok: data.ok };
    }
    const data: any = await updateWordStatistics(this.userId, this.token, newWordStatistics);
    return { status: data.ok ? 'ok' : 'error', ok: data.ok };
  },

  async saveWord(wordStatistics, isRight) {
    const newWordStatistics = wordStatistics;
    newWordStatistics.isNew = false;
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
    const statisticsRes = await setUserStatistics(this.userId, this.token, userStatistics);
    if (!statisticsRes.ok) {
      return { ok: false };
    }
    if (wordStatistics.isNew) {
      const data = await uploadWordStatistics(this.userId, this.token, newWordStatistics);
      return { ok: data.ok };
    }
    const data = await updateWordStatistics(this.userId, this.token, newWordStatistics);
    return { ok: data.ok };
  },

  async initUser(userId, token) {
    this.isInit = this.userId === userId;
    this.userId = userId;
    this.token = token;
    if (!this.isInit) {
      this.levelWords = [0, 0, 0, 0, 0, 0];
      this.days = {};
      this.series = 0;
      const statisticsData:any = await getUserStatistics(userId, token);

      if (statisticsData.status === 404) {
        const userStatistics: UserStatisticsInterface = {
          days: this.days,
          levelWords: this.levelWords
        };
        const statisticsRes = await setUserStatistics(this.userId, this.token, userStatistics);
        return { ok: statisticsRes.ok };
      }

      if (!statisticsData.ok) {
        return { ok: false };
      }

      const userStatistics = statisticsData.statistics as UserStatisticsInterface;
      this.levelWords = userStatistics.levelWords;
      this.days = userStatistics.days;
    }
    return { ok: true };
  }
};

export default statistics;
