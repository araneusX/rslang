import React, { useContext, useEffect, useState } from 'react';
import Start from './components/Start';
import Main from './components/Main';
import Results from './components/Results';

import style from './sprint.module.scss';
import { StateContext } from '../../../store/stateProvider';

const Sprint = () => {
  const { state, dispatch } = useContext(StateContext);
  const [screen, setScreen] = useState('start');

  return (
    <div className={style.page}>
      {screen === 'start' && <Start />}
      { screen === 'main' && <Main />}
      { screen === 'results' && <Results />}
    </div>
  );
};

export default Sprint;
