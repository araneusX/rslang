import React, { useContext, useEffect } from 'react';
import Start from './components/start';
import Main from './components/main';
import Results from './components/results';

import style from './speakit.module.scss';
import { StateContext } from '../../../store/stateProvider';

type SpeakItPropsType = {};

const SpeakIt: React.FC<SpeakItPropsType> = () => {
  const { state, dispatch } = useContext(StateContext);
  const { screen } = state.speakit;

  useEffect(() => (() => {
    dispatch({ type: 'SET_SPEAKIT_SCREEN', value: 'start' });
  }), []);

  return (
    <div
      className={
        `${style.page} ${screen === 'start' || screen === 'results' ? `${style.background}` : ''}`
      }
    >
      {screen === 'start' && <Start />}
      { screen === 'main' && <Main />}
      { screen === 'results' && <Results />}
    </div>
  );
};

export default SpeakIt;
