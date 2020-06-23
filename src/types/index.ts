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
  series: number,
  userId: string,
  token: string,
  isInit: boolean,

  getAllDayStatistics: () => DayInterface,

  getDayStatistics: () => DayInterface,

  initUser: (
    userId: string,
    token: string
  ) => Promise<{ok: boolean}>,

  toggleDeleted: (
    word: WordStatisticsInterface,
  ) => Promise<{ok: boolean}>,

  toggleDifficult: (
    word: WordStatisticsInterface,
  ) => Promise<{ok: boolean}>,

  saveWord: (
    word: WordStatisticsInterface,
    isRight: boolean,
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

export interface CardInterface{
  id: string,
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
}

export interface AuthInterface {
  isAuth: boolean,
  userId: string,
  token: string
}

export interface CardSettingsInterface {
  imageToCard: boolean,
  pronounseToCard: boolean,
  transcriptionToCard: boolean,
  translateToTheCard: boolean,
  exampleToCard: boolean,
  explainToCard: boolean,
}

export interface SettingsOptionalInterface extends CardSettingsInterface {
  maxCountCard: number,
  showAnswerButton: boolean,
  wordDeleteButton: boolean,
  addToDifficultWordsButton: boolean,
  addGrageButton: boolean,
}
export interface SettingsInterface {
  wordsPerDay: number,
  optional : SettingsOptionalInterface
}

export interface StateInterface {
  auth: AuthInterface,
  settings: SettingsInterface,
}
