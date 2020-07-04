import React, { useContext, useState } from 'react';

import style from '../sprint.module.scss';
import { StateContext } from '../../../../store/stateProvider';
import StartGameTimer from './StartGameTimer';

const Start = () => {
  const { state, dispatch } = useContext(StateContext);
  const { startGame } = state.sprint;

  const startGameF = () => {
    dispatch({ type: 'SET_SPRINT_START_GAME' });
  };

  return (
    <>
      {startGame ? <StartGameTimer />
        : (
          <div className={style.page}>
            <button type="button" onClick={startGameF}>
              Start game
            </button>
          </div>
        )}
    </>
  );
};

export default Start;
