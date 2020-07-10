import React, { useState } from 'react';
import Start from './components/Start';
import Main from './components/Main';
import Results from './components/Results';

import style from './audioCall.module.scss';
import { Preloader } from '../../../commonComponents';

const AudioCall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [screen, setScreen] = useState('start');

  return (
    <div>
      {isLoading ? <Preloader /> : null}
      <div className={style.wrap}>
        {screen === 'start' && <Start />}
        { screen === 'main' && <Main />}
        { screen === 'results' && <Results />}
      </div>

    </div>
  );
};

export default AudioCall;
