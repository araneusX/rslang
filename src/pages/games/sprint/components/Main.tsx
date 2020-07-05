import React, { useContext, useEffect } from 'react';

import style from '../sprint.module.scss';
import { StateContext } from '../../../../store/stateProvider';
import SprintContext from '../sprintContext';
import { StatisticsContext } from '../../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../../types';

const Main = () => {
  const levelsSelect = [1, 2, 3, 4, 5, 6, 7];
  const roundSelect = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const userWordValue = 7;
  const { getStartWords } = useContext(SprintContext);
  const { state, dispatch } = useContext(StateContext);
  const { level, round } = state.sprint;
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const userLearnedWord = statistics.getAllWordsId();
  const {
    roundTime, pointsForRound, words, pointsForAnswer, pointsLevel, correctAnswersInRow, step
  } = state.sprint;

  const sendLevel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const nextWords = await getStartWords(level, level !== userWordValue, round);
    dispatch({ type: 'SET_SPRINT_NEW_GAME', value: { level, words: nextWords, selectLevel: (level - 1) !== userWordValue } });
  };

  const changeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } : any = e.target;
    dispatch({ type: 'SET_SPRINT_LEVEL_NUMBER', value: Number(value) - 1 });
  };

  const changeRound = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } : any = e.target;
    dispatch({ type: 'SET_SPRINT_ROUND_NUMBER', value: Number(value) });
  };

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
        <div>
          select level:
          <select name="levelSelect" id="levelSelect" onChange={changeLevel} value={level + 1}>
            {levelsSelect.map((i) => (
              <option
                key={i}
                value={i}
                disabled={(userLearnedWord.length < 60 && i === userWordValue)}
              >
                { (i === userWordValue) ? 'User words' : i}
              </option>
            ))}
          </select>
          select round:
          <select
            name="roundSelect"
            id="roundSelect"
            disabled={level + 1 === userWordValue}
            onChange={changeRound}
            value={round}
          >
            {roundSelect.map((i) => (
              <option
                key={i}
                value={i}
              >
                { i }
              </option>
            ))}
          </select>
          <button type="button" onClick={sendLevel}>Select Level</button>
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
