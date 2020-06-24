import {
  UserStatisticsInterface, WordStatisticsInterface, DayInterface, SettingsInterface
} from '../types';

export const initialUserStatisticsObject: UserStatisticsInterface = {
  days: {},
  levelWords: [0, 0, 0, 0, 0, 0]
};

export const initialWordStatisticsObject: WordStatisticsInterface = {
  wordId: '',
  isNew: true,
  allRight: 0,
  allShow: 0,
  continuedRight: 0,
  difficulty: 3,
  isDeleted: false,
  isDifficult: false,
  lastRight: ''
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
    imageToCard: false,
    pronounceToCard: false,
    transcriptionToCard: false,
    translateToTheCard: false,
    exampleToCard: false,
    explainToCard: false,
    showAnswerButton: false,
    wordDeleteButton: false,
    addToDifficultWordsButton: false,
    addGradeButton: false
  }
};
