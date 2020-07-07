import React, { useContext } from 'react';

import style from './start.module.scss';
import { StateContext } from '../../../../store/stateProvider';

type StartPropsType = {};

const Start: React.FC<StartPropsType> = () => {
  const { dispatch } = useContext(StateContext);

  const handleStart = () => {
    dispatch({ type: 'SET_OUR_SCREEN', value: 'main' });
  };

  return (
    <div className={style.wrapper}>
      <p className={style.title}>Associations</p>
      <p className={style.text}>
        Click on the word then click on the image with an association
        to this word. Than more right connections you will do than more points you will get. Good luck!
      </p>
      <button className={style.button} type="button" onClick={handleStart}>Start</button>
    </div>
  );
};

export default Start;
