import React, { useContext } from 'react';
import StartScreen from './components/startScreen';
import MainScreen from './components/mainScreen';
import Results from './components/results';

import style from './speakit.module.scss';
import { StateContext } from '../../../store/stateProvider';

type SpeakItPropsType = {};

const SpeakIt: React.FC<SpeakItPropsType> = () => {
  const { state } = useContext(StateContext);
  const { screen } = state.speakit;

  return (
    <div className={style.page}>
      {screen === 'start' && <StartScreen />}
      { screen === 'main' && <MainScreen />}
      { screen === 'results' && <Results />}
    </div>
  );
};

export default SpeakIt;
