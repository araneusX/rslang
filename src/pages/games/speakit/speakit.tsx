import React, { useContext, useEffect } from 'react';
import start from './components/start';
import main from './components/main';
import Results from './components/results';

import style from './speakit.module.scss';
import { StateContext } from '../../../store/stateProvider';
import { StatisticsContext } from '../../../statistics/statisticsProvider';

type SpeakItPropsType = {};

const SpeakIt: React.FC<SpeakItPropsType> = () => {
  const { state, dispatch } = useContext(StateContext);
  const { words } = state.speakit;
  const statistics = useContext(StatisticsContext);
  const { screen } = state.speakit;

  useEffect(() => (() => {
    dispatch({ type: 'SET_SPEAKIT_SCREEN', value: 'start' });
  }), []);

  return (
    <div className={style.page}>
      {screen === 'start' && <start />}
      { screen === 'main' && <main />}
      { screen === 'results' && <Results />}
    </div>
  );
};

export default SpeakIt;
