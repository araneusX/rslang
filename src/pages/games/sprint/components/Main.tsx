import React, { useContext, useEffect, useRef } from 'react';

import style from '../sprint.module.scss';
import { StateContext } from '../../../../store/stateProvider';
import SprintContext from '../sprintContext';
import { StatisticsContext } from '../../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../../types';

const Main = () => {
  const levelsSelect = [1, 2, 3, 4, 5, 6, 7];
  const roundSelect = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const arrAnswer: number[] = [1, 2, 3];

  const gameWrapCard = useRef(null);

  const userWordValue = 7;
  const { getStartWords } = useContext(SprintContext);
  const { state, dispatch } = useContext(StateContext);

  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const userLearnedWord = statistics.getAllWordsId();
  const {
    level, round, roundTime, pointsForRound, words, pointsForAnswer, pointsLevel, correctAnswersInRow, step
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
    if (words.length === step + 1) {
      dispatch({ type: 'SET_SPRINT_END_GAME' });
    }
    const wrapper : any = gameWrapCard.current;

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

      wrapper.classList.add('game-sprint-correct');
      setTimeout(() => {
        wrapper.classList.remove('game-sprint-correct');
      }, 300);
    } else {
      dispatch({ type: 'SET_SPRINT_STEP_AND_CORRECT_ANSWERS_IN_ROW', value: (step + 1) });
      dispatch({ type: 'SET_SPRINT_POINTS_LEVEL', value: 0 });

      wrapper.classList.add('game-sprint-error');
      setTimeout(() => {
        wrapper.classList.remove('game-sprint-error');
      }, 300);
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
    <div className={style.mainGameWrapper}>
      <div className={style.settingBlock}>
        <div className={style.levelSelect}>
          <div>
            уровень:
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
          </div>
          <div>
            раунд:
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
          </div>
          <div>
            <button type="button" onClick={sendLevel}>Выбрать</button>
          </div>
        </div>
        <div className={style.stepNow}>
          { step + 1 }
          /
          { words.length }
          <span className={style.stepNowText}>
            (Текущее слово / Всего слов)
          </span>
        </div>
      </div>
      <div className={style.gameCardWrapper}>
        <div className={style.pointsForRound}>
          {pointsForRound}
        </div>
        <div className={style.roundTime}>
          {roundTime}
        </div>
        <div className={style.gameCard} ref={gameWrapCard}>
          <div className={style.dots}>
            {pointsLevel < 2
              ? arrAnswer.map((i) => ((i > correctAnswersInRow) ? <span key={i} className={style.grayDot} /> : <span key={i} className={style.greenDot} />))
              : (<span className={style.greenDot} />)}
          </div>
          <div className={style.pointsForAnswer}>
            +
            {pointsForAnswer[pointsLevel]}
          </div>
          <div className={style.wordWrap}>
            <div>
              <div className={style.wordWrapWord}>
                {words[step].word}
              </div>
              <div className={style.wordWrapAnswer}>
                {words[step].answerToUser}
              </div>
              <div className={style.answerButton}>
                <button className={style.colorGreen} onClick={() => setAnswer(true)} type="button">Верно</button>
                {'   '}
                <button className={style.colorRed} onClick={() => setAnswer(false)} type="button">Неверно</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
