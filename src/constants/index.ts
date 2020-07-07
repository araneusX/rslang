import {
  UserStatisticsInterface, WordStatisticsInterface, DayInterface, SettingsInterface, TrainingStateInterface
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
    imageToCard: false,
    pronounseToCard: false,
    transcriptionToCard: false,
    translateToTheCard: false,
    exampleToCard: false,
    explainToCard: false,
    showAnswerButton: false,
    wordDeleteButton: false,
    addToDifficultWordsButton: false,
    addGrageButton: false
  }
};

export const initTrainingObject: TrainingStateInterface = {
  screen: 'start',
  isAudioOn: true,
  card: {
    id: '5e9f5ee35eb9e72bc21af4a0',
    group: 0,
    page: 0,
    word: 'alcohol',
    image: 'files/01_0002.jpg',
    audio: 'files/01_0002.mp3',
    audioMeaning: 'files/01_0002_meaning.mp3',
    audioExample: 'files/01_0002_example.mp3',
    textMeaning: '<i>Alcohol</i> is a type of drink that can make people drunk.',
    textExample: 'A person should not drive a car after he or she has been drinking <b>alcohol</b>.',
    transcription: '[ǽlkəhɔ̀ːl]',
    textExampleTranslate: 'Человек не должен водить машину после того, как он выпил алкоголь',
    textMeaningTranslate: 'Алкоголь - это тип напитка, который может сделать людей пьяными',
    wordTranslate: 'алкоголь',
    wordsPerExampleSentence: 15
  },
  complete: false,
  isFirstVisit: true,
  trainingMode: 1,
};
