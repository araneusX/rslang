import React, { useContext, useEffect } from 'react';
import style from './ourGame.module.scss';
import Start from './components/Start';
import Main from './components/Main';

import { StateContext } from '../../../store/stateProvider';

type OurGamePropsType = {};

const OurGame: React.FC<OurGamePropsType> = () => {
  const { state, dispatch } = useContext(StateContext);
  const { screen } = state.our;

  useEffect(() => (() => {
    dispatch({ type: 'SET_OUR_SCREEN', value: 'start' });
  }), []);

  return (
    <div className={style.page}>
      {screen === 'start' && <Start />}
      { screen === 'main' && <Main />}
    </div>
  );
};

export default OurGame;
