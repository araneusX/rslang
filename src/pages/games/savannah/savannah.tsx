import React, { useState } from 'react';
import style from './savannah.module.scss';
import StartGamePage from './components/StartGamePage';
import SavannahGameWrapper from './components/GameWrapper';

export interface StartSavannah {
  wordForGame: object,
  allAnswerArray: object,
  errorAnswer: object,
  correctAnswer: object,
  life: number,
  startGame: boolean,
  startTimer: number
}

const Savannah = () => {
  const startSavannah: StartSavannah = {
    wordForGame: [],
    allAnswerArray: [],
    errorAnswer: [],
    correctAnswer: [],
    life: 5,
    startGame: false,
    startTimer: 3
  };

  const [savannah, setSavannah] = useState(startSavannah);

  return (
    <>
      {savannah.startGame
        ? <SavannahGameWrapper savannah={savannah} setSavannah={setSavannah} />
        : <StartGamePage savannah={savannah} setSavannah={setSavannah} />}
    </>
  );
};

export default Savannah;
