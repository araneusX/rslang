import React, { useContext } from 'react';

import style from '../sprint.module.scss';
import { StateContext } from '../../../../store/stateProvider';
import StartGameTimer from './StartGameTimer';

const Start = () => {
  const { state, dispatch } = useContext(StateContext);
  const { startGame } = state.sprint;

  const startGameF = () => {
    if (state.sprint.words.length) {
      dispatch({ type: 'SET_SPRINT_START_GAME' });
    }
  };

  return (
    <>
      {startGame ? <StartGameTimer />
        : (
          <div className={style.page}>
            <div className={style.startPageWrapper}>
              <div className={style.startCard}>
                <h2>
                  Sprint
                </h2>
                <p>
                  Let’s play sprint. The more questions you answer correctly, the more experience you get.
                </p>
                <button type="button" onClick={startGameF}>
                  Start
                </button>
              </div>

            </div>
          </div>
        )}
    </>
  );
};

export default Start;
