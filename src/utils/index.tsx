import { DayInterface } from '../types';
import { initialDayStatisticsObject } from '../constants';

export function createIdFromDate(): string {
  const date = new Date();

  const day:number = date.getDate();
  const month: number = date.getMonth() + 1;

  const dd: string = day < 10 ? `0${day}` : `${day}`;
  const mm: string = month < 10 ? `0${month}` : `${month}`;
  const y: string = `${date.getFullYear()}`.slice(-1);

  return `${dd}${mm}${y}`;
}

export function getFormattedDate(date: Date = new Date()): string {
  const day:number = date.getDate();
  const month: number = date.getMonth() + 1;

  const dd: string = day < 10 ? `0${day}` : `${day}`;
  const mm: string = month < 10 ? `0${month}` : `${month}`;
  const yyyy: string = `${date.getFullYear()}`;

  return `${dd}-${mm}-${yyyy}`;
}

export function createDayStatisticsObject(): DayInterface {
  const day = { ...initialDayStatisticsObject };
  day.date = getFormattedDate();
  return day;
}

export const generateFullDays = (savedDays: DayInterface[]) => {
  const startDate = savedDays[0].date.split('-');
  let startYear = Number(startDate[2]);
  let startMonth = Number(startDate[1]);
  let startDay = Number(startDate[0]);

  const endDate = savedDays[savedDays.length - 1].date.split('-');
  const endYear = Number(endDate[2]);
  const endMonth = Number(endDate[1]);
  const endDay = Number(endDate[0]);

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const dates: string[] = [];

  const createDate = (day: number, month: number, year: number) => {
    let date = day < 10 ? `0${day}` : `${day}`;
    date += month < 10 ? `-0${month}` : `-${month}`;
    date += `-${year}`;
    return date;
  };

  while (!(startYear === endYear && startMonth === endMonth && startDay === endDay)) {
    dates.push(createDate(startDay, startMonth, startYear));
    if (startDay < daysInMonth[startMonth - 1]
        || (startMonth === 2 && startDay === 28
            && (startYear % 4 === 0 && (startYear % 100 !== 0 || startYear % 400 === 0)))) {
      startDay += 1;
    } else if (startMonth < 12) {
      startMonth += 1;
      startDay = 1;
    } else {
      startYear += 1;
      startMonth = 1;
      startDay = 1;
    }
  }

  dates.push(createDate(startDay, startMonth, startYear));

  const days = dates.map((item) => savedDays.find((day) => day.date === item)
  || {
    date: item,
    cards: 0,
    newWords: 0,
    right: 0,
    series: 0
  } as DayInterface);

  return days;
};
