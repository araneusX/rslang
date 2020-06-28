interface WordForGame {
  [key:string]: any
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
  level: number
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
  level: 6
};
