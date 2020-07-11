import {
  UserStatisticsInterface, WordStatisticsInterface, DayInterface, SettingsInterface, SpeakitStateInterface, SprintStateInterface
} from '../types';

export const initialUserStatisticsObject: UserStatisticsInterface = {
  days: {},
  progress: {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0
  },
  miniGames: {
    speakit: {},
    puzzle: {},
    savannah: {},
    audiochallenge: {},
    sprint: {},
    our: {}
  }
};

export const initialWordStatisticsObject: WordStatisticsInterface = {
  isCorrect: true,
  wordId: '',
  allRight: 0,
  allShow: 0,
  continuedRight: 0,
  maxContinuedRight: 0,
  interval: 0,
  isDeleted: false,
  isDifficult: false,
  lastRight: 'never'
};

export const initialDayStatisticsObject: DayInterface = {
  cards: 0,
  date: '',
  newWords: 0,
  right: 0,
  series: 0
};

export const initSettingsObject: SettingsInterface = {
  wordsPerDay: 10,
  optional: {
    maxCountCard: 20,
    imageToCard: true,
    pronounseToCard: true,
    transcriptionToCard: true,
    translateToTheCard: true,
    exampleToCard: true,
    explainToCard: true,
    showAnswerButton: true,
    wordDeleteButton: true,
    addToDifficultWordsButton: true,
    addGrageButton: true,
    level: 1
  }
};

export const initialSpeakitObject: SpeakitStateInterface = {
  level: 0,
  round: 0,
  screen: 'start',
  words: [],
  complete: false,
  game: false,
  mode: 'user'
};

export const SERVER = 'https://afternoon-falls-25894.herokuapp.com'; // https://afternoon-falls-25894.herokuapp.com

export const WORDS_COUNT = 3600;

export const initialSprintObject: SprintStateInterface = {
  level: 6,
  round: 1,
  selectLevel: false,
  screen: 'start',
  step: 0,
  correctAnswersInRow: 0,
  words: [],
  startGame: false,
  finishGame: false,
  pointsForAnswer: [20, 40, 80],
  pointsForRound: 0,
  pointsLevel: 0,
  roundTime: 45
};
