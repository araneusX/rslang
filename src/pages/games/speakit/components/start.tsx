import React, { useContext } from 'react';

import style from './start.module.scss';
import { StateContext } from '../../../../store/stateProvider';
import { SimpleButton } from '../../../../commonComponents';

type StartPropsType = {};

const Start: React.FC<StartPropsType> = () => {
  const { dispatch } = useContext(StateContext);

  const handleStart = () => {
    dispatch({ type: 'SET_SPEAKIT_SCREEN', value: 'main' });
  };

  return (
    <div className={style.wrapper}>
      <p className={style.title}>Speak It</p>
      <p className={style.text}>
        {`Вам понадобится микрофон. Дайте разрешение браузеру на использование микрофона.
        Во время игры кликните по кнопке "Включить микрофон" и произносите слова.`}
      </p>
      <SimpleButton clickHandler={handleStart} text="Начать!" size="s1" />
    </div>
  );
};

export default Start;
