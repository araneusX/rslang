export type ResStatus = 'ok' | 'error' | 'noToken';

export type MiniGamesNamesType = 'speakit' | 'puzzle' | 'savannah' | 'audiochallenge' | 'sprint' | 'our';
export interface DayInterface {
  date: string,
  cards: number,
  newWords: number,
  right: number,
  series: number,
}

export interface UserStatisticsInterface {
  progress: {
    '0': number,
    '1': number,
    '2': number,
    '3': number,
    '4': number,
    '5': number
  },
  days: {
    [day: string]: DayInterface
  },
  miniGames: {
    speakit: {
      [date: string]: number[],
    },
    puzzle: {
      [date: string]: number[],
    },
    savannah: {
      [date: string]: number[],
    },
    audiochallenge: {
      [date: string]: number[],
    },
    sprint: {
      [date: string]: number[],
    },
    our: {
      [date: string]: number[],
    }
  }
}

export interface StatisticsInterface extends UserStatisticsInterface {
  series: number,
  userId: string,
  token: string,
  isInit: boolean,
  userWords: WordStatisticsInterface[],
  userWordsId: {
    [word: string]: WordStatisticsInterface
  },

  getProgress: () => {},

  getAllDayStatistics: () => DayInterface,

  getForEachDayStatistics: () => DayInterface[],

  getDayStatistics: () => DayInterface,

  saveMini: (name: MiniGamesNamesType, result: number) => Promise<{ok: boolean}>,

  getMini: (name: MiniGamesNamesType) => {};

  initUser: (
    userId: string,
    token: string
  ) => Promise<{ok: boolean}>,

  toggleParams: (
    param: string,
    wordId: string,
  ) => Promise<{ok: boolean}>,

  toggleDeleted: (
    wordId: string,
  ) => Promise<{ok: boolean}>,

  toggleDifficult: (
    wordId: string,
  ) => Promise<{ok: boolean}>,

  saveWord: (
    wordId: string,
    isRight: boolean,
    difficulty: 0|1|2,
    group: 0|1|2|3|4|5
  ) => Promise<{ok: boolean}>,

  saveWordMini: (
    wordId: string,
    isRight: boolean,
  ) => Promise<{ok: boolean}>,

  getAllWordsStatistics: (filter?: 'all' | 'difficult') => WordStatisticsInterface[],

  getWordStatistics: (filter?: 'all' | 'difficult') => WordStatisticsInterface | null,

  getAllWordsId: (filter?: 'all' | 'difficult') => string[],

  getWordId: (filter?: 'all' | 'difficult') => string | null,

  getAllWordsStatisticsWithDeleted: () => WordStatisticsInterface[]

}

export interface WordStatisticsInterface {
  isCorrect: boolean;
  wordId: string,
  isDeleted: boolean,
  isDifficult: boolean,
  interval: number,
  allShow: number,
  allRight: number,
  continuedRight: number,
  maxContinuedRight: number,
  lastRight: string
}

export interface BackendWordInterface {
  id: string,
  group: 0|1|2|3|4|5,
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
  group: 0|1|2|3|4|5,
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
  showAnswerButton: boolean,
  addToDifficultWordsButton: boolean,
  addGrageButton: boolean,
  wordDeleteButton: boolean,
}

export interface SettingsOptionalInterface extends CardSettingsInterface {
  maxCountCard: number,
  showAnswerButton: boolean,
  wordDeleteButton: boolean,
  addToDifficultWordsButton: boolean,
  addGrageButton: boolean,
  level: number
}
export interface SettingsInterface {
  wordsPerDay: number,
  optional : SettingsOptionalInterface
}

export interface SpeakitWordInterface extends BackendWordInterface {
  sound: HTMLAudioElement,
  isRecognized: boolean,
  index: number
}

export type SpeakitScreenType = 'start' | 'main' | 'results';
export type SpeakitModeType = 'user' | 'vocabulary';
export interface SpeakitStateInterface {
  round: number,
  level: number,
  screen: SpeakitScreenType,
  words: SpeakitWordInterface[],
  complete: boolean,
  game: boolean,
  mode: SpeakitModeType
}

export type TrainingScreenType = 'start' | 'main';

export interface TrainingStateInterface {
  screen: TrainingScreenType,
  isAudioOn: boolean,
  card: BackendWordInterface,
  complete: boolean,
  isFirstVisit: boolean,
  trainingMode: string;
}

export interface StateInterface {
  auth: AuthInterface,
  settings: SettingsInterface,
  speakit: SpeakitStateInterface,
  training: TrainingStateInterface
}
