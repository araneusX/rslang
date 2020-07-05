import React, { useContext, useEffect } from 'react';

import style from '../sprint.module.scss';
import { StateContext } from '../../../../store/stateProvider';

const Main = () => {
  const { state, dispatch } = useContext(StateContext);
  const {
    roundTime, pointsForRound, words, pointsForAnswer, pointsLevel, correctAnswersInRow, step
  } = state.sprint;

  const setAnswer = (answer:boolean):void => {
    if ((words[step].answerToUser === words[step].wordTranslate) === answer) {
      let correctAnswersInRowNext: number = correctAnswersInRow;
      let pointsLevelNext: number = pointsLevel;
      if (correctAnswersInRow < 3 && pointsLevel < 2) {
        correctAnswersInRowNext = (correctAnswersInRow + 1);
      } else if (pointsLevel < 2) {
        correctAnswersInRowNext = 0;
        pointsLevelNext = pointsLevel + 1;
      } else {
        correctAnswersInRowNext = 3;
        pointsLevelNext = 2;
      }

      dispatch(
        {
          type: 'SET_SPRINT_CORRECT_ANSWER',
          value: { correctAnswersInRowNext, pointsLevelNext, pointsForAnswerPlus: pointsForAnswer[pointsLevel] }
        }
      );
    } else {
      dispatch({ type: 'SET_SPRINT_STEP_AND_CORRECT_ANSWERS_IN_ROW', value: (step + 1) });
      dispatch({ type: 'SET_SPRINT_POINTS_LEVEL', value: 0 });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (roundTime > 0) {
        dispatch({ type: 'SET_SPRINT_ROUND_TIME', value: (roundTime - 1) });
      } else {
        dispatch({ type: 'SET_SPRINT_END_GAME' });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [roundTime, dispatch]);

  return (
    <>
      <div className={style.gameWrapper}>
        <div>
          roundTime:
          {roundTime}
        </div>
        <div>
          pointsForRound:
          {pointsForRound}
        </div>
      </div>
      <div className={style.gameCard}>
        <div>
          Очков за слово:
          {pointsForAnswer[pointsLevel]}
        </div>
        <div>
          {pointsLevel < 2
            ? (`Правильных ответов в подряд:${correctAnswersInRow}`)
            : 'Max points'}
        </div>
        <div className={style.wordWrap}>
          <div>
            <div>
              Слово:
              {words[step].word}
            </div>
            <div>
              Вариант ответа:
              {words[step].answerToUser}
            </div>
            <div className={style.answerButton}>
              <button onClick={() => setAnswer(true)} type="button">Верно</button>
              {'   '}
              <button onClick={() => setAnswer(false)} type="button">Не Верно</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
