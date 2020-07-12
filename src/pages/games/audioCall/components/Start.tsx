import React, { useContext } from 'react';

import style from '../audioCall.module.scss';
import { StateContext } from '../../../../store/stateProvider';
import StartGameTimer from './StartGameTimer';

const Start = () => {
  const { state, dispatch } = useContext(StateContext);
  const { startGame } = state.audioCall;

  const startGameF = () => {
    if (state.audioCall.words.length) {
      dispatch({ type: 'SET_AUDIO_START_GAME' });
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
                  Аудиовызов
                </h2>
                <p>
                  Аудио-тренинг развивает ваши навыки слушания. Чем больше слов вы знаете, тем больше опыта вы получаете.
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
