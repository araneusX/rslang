export interface WordForGame {
  id: number,
  group: 0,
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

export interface StartSavannah {
  wordForGame: WordForGame[],
  allAnswerArray: string[],
  errorAnswerArray: string[],
  correctAnswer: string[],
  life: number,
  startGame: boolean,
  endGame: boolean,
  startTimer: number,
  level: number,
  selectPage: number,
  setLevel: boolean
}

export const initialSavannah: StartSavannah = {
  wordForGame: [],
  allAnswerArray: [],
  errorAnswerArray: [],
  correctAnswer: [],
  life: 5,
  startGame: false,
  endGame: false,
  startTimer: 3,
  level: 0,
  selectPage: 1,
  setLevel: false
};
