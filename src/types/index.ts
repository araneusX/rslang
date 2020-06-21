export type WordDifficultyType = 0|1|2|3;

export type ResStatus = 'ok' | 'error' | 'noToken';

export interface DayInterface {
  date: string,
  cards: number,
  newWords: number,
  right: number,
  series: number,
}

export interface UserStatisticsInterface {
  levelWords: [number, number, number, number, number, number],
  days: {
    [day: string]: DayInterface
  },
}

export interface StatisticsInterface extends UserStatisticsInterface {
  series: 0,
  getAllDayStatistics: () => {},
  getDayStatistics: () => DayInterface,
  init: (
    userId: string,
    token: string
  ) => Promise<{ok: boolean}>,

  toggleDeleted: (
    word: WordStatisticsInterface,
    userId: string, token: string
  ) => Promise<{ok: boolean}>,

  toggleDifficult: (
    word: WordStatisticsInterface,
    userId: string, token: string
  ) => Promise<{ok: boolean}>,

  saveWord: (
    word: WordStatisticsInterface,
    difficulty: WordDifficultyType,
    isRight: boolean,
    userId: string,
    token: string
  ) => Promise<{ok: boolean}>,
}

export interface WordStatisticsInterface {
  wordId: string,
  isNew: boolean,
  isDeleted: boolean,
  isDifficult: boolean,
  difficulty: WordDifficultyType,
  allShow: number,
  allRight: number,
  continuedRight: number,
  lastRight: string
}

export interface BackendWordInterface {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  textExampleTranslate: string,
  textMeaningTranslate: string,
  wordTranslate: string,
  wordsPerExampleSentence: number
}
