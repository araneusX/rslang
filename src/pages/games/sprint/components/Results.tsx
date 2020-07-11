import React, { useContext, useState, useEffect } from 'react';

import style from '../sprint.module.scss';
import { StateContext } from '../../../../store/stateProvider';
import SprintContext from '../sprintContext';
import { StatisticsContext } from '../../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../../types';

const Results = () => {
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const { state, dispatch } = useContext(StateContext);
  const { getStartWords } = useContext(SprintContext);

  const [statistic, setStatistic] = useState(false);
  const [allStatistic, setAllStatistic]:any[] = useState([{}]);

  const newGame = async () => {
    const round = state.sprint.round < 10 ? state.sprint.round + 1 : 1;
    const nextWords = await getStartWords(state.sprint.level, state.sprint.selectLevel, round);

    dispatch({ type: 'SET_SPRINT_ROUND_NUMBER', value: round });
    dispatch({ type: 'SET_SPRINT_NEW_GAME', value: { level: state.sprint.level, words: nextWords, selectLevel: state.sprint.selectLevel } });
  };

  const restartGame = async () => {
    const nextWords = await getStartWords(state.sprint.level, state.sprint.selectLevel, state.sprint.round);
    dispatch({ type: 'SET_SPRINT_NEW_GAME', value: { level: state.sprint.level, words: nextWords, selectLevel: state.sprint.selectLevel } });
  };

  useEffect(() => {
    statistics.saveMini('sprint', state.sprint.pointsForRound).then((res) => {
      const mini = statistics.getMini('sprint');
      setAllStatistic(mini);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.resultPageWrapper}>
      {statistic ? (
        <div className={style.statisticPage}>
          <div className={style.statisticPageHeader}>
            <button onClick={() => setStatistic(false)} type="button">Назад</button>
            <h4>
              Статистика игры:
            </h4>
          </div>
          <div className={style.statisticPageBody}>
            {allStatistic.map((obj: { date: string, results: number[]; }) => (
              <div key={obj.date}>
                <div className={style.statisticPageDate}>
                  {obj.date}
                </div>

                <div className={style.statisticPagePoints}>
                  {obj.results.map((i:number, index:number) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={i + index}>
                      Набранно очков:
                      {i}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
        : (
          <div className={style.resultPage}>
            <div className={style.resultPageText}>
              <h3>
                Результат игры:
              </h3>
              <div className={style.statisticPagePoints}>
                Очки:
                {' '}
                <span>
                  {state.sprint.pointsForRound}
                </span>
              </div>
              <div className={style.statisticPageAllWord}>
                Пройденно слов:
                {' '}
                <span>
                  {state.sprint.step}
                </span>
              </div>

            </div>
            <div className={style.resultPageBtn}>
              <button onClick={restartGame} type="button">Повторить</button>
              <button onClick={newGame} type="button">Новая игра</button>
              <button onClick={() => setStatistic(true)} type="button">Статистика</button>
            </div>
          </div>
        )}
    </div>

  );
};

export default Results;
