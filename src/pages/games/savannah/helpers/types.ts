export interface StartSavannah {
  wordForGame: [],
  allAnswerArray: [],
  errorAnswerArray: [],
  correctAnswer: [],
  life: number,
  startGame: boolean,
  endGame: boolean,
  startTimer: number
}

export const initialSavannah: StartSavannah = {
  wordForGame: [],
  allAnswerArray: [],
  errorAnswerArray: [],
  correctAnswer: [],
  life: 5,
  startGame: false,
  endGame: false,
  startTimer: 3
};
