import React, { useContext } from 'react';

import style from './start.module.scss';
import { SpeakitScreenType } from '../../../../types';
import { StateContext } from '../../../../store/stateProvider';

type startPropsType = {};

const start: React.FC<startPropsType> = () => {
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

export default start;
