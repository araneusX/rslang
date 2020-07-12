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
      <p className={style.title}>Ассоциации</p>
      <p className={style.text}>
        Нажмите на слово, затем нажмите на изображение с ассоциацией к этому слову. Чем больше правильных пар Вы составите, тем больше получите баллов. Удачи!
      </p>
      <button className={style.button} type="button" onClick={handleStart}>Начать</button>
    </div>
  );
};

export default Start;
