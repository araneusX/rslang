import React, { useContext } from 'react';

import style from './startScreen.module.scss';
import { SpeakitScreenType } from '../../../../types';
import { StateContext } from '../../../../store/stateProvider';

type StartScreenPropsType = {};

const StartScreen: React.FC<StartScreenPropsType> = () => {
  const { dispatch } = useContext(StateContext);

  const handleStart = () => {
    dispatch({ type: 'SET_SPEAKIT_SCREEN', value: 'main' });
  };

  return (
    <div className={style.wrapper}>
      <p className={style.title}>Speak It</p>
      <p className={style.text}>Click on the words to hear them sound. Click on the button and speak the words into the microphone.</p>
      <button className={style.button} type="button" onClick={handleStart}>Start</button>
    </div>
  );
};

export default StartScreen;
