import React, { useState, useEffect, useContext } from 'react';
import style from './savannah.module.scss';
import StartGamePage from './components/StartGamePage';
import SavannahGameWrapper from './components/GameWrapper';
import { BackendContext } from '../../../backend/backendProvider';

export interface StartSavannah {
  wordForGame: object,
  allAnswerArray: object,
  errorAnswerArray: object,
  correctAnswer: object,
  life: number,
  startGame: boolean,
  endGame: boolean,
  startTimer: number
}

const Savannah = () => {
  const startSavannah: StartSavannah = {
    wordForGame: [],
    allAnswerArray: [],
    errorAnswerArray: [],
    correctAnswer: [],
    life: 5,
    startGame: false,
    endGame: false,
    startTimer: 3
  };

  const { getWords } = useContext(BackendContext);
  const [savannah, setSavannah] = useState(startSavannah);

  useEffect(() => {
    getWords(2, 0).then(
      (res: any) => {
        setSavannah({
          ...savannah,
          wordForGame: res,
          allAnswerArray: res.map((i:any) => i.wordTranslate)
        });
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {savannah.startGame
        ? <SavannahGameWrapper savannah={savannah} setSavannah={setSavannah} />
        : <StartGamePage savannah={savannah} setSavannah={setSavannah} />}
    </>
  );
};

export default Savannah;
