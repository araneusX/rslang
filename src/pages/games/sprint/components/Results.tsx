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
    const nextWords = await getStartWords();
    dispatch({ type: 'SET_SPRINT_LEVEL', value: { level: state.sprint.level, words: nextWords, selectLevel: state.sprint.selectLevel } });
  };

  useEffect(() => {
    statistics.saveMini('sprint', state.sprint.pointsForRound).then((res) => {
      const mini = statistics.getMini('sprint');
      setAllStatistic(mini);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {statistic ? (
        <div>
          <button onClick={() => setStatistic(false)} type="button">Назад</button>
          statistic:
          <div>
            {allStatistic.map((obj: { date: string, results: number[]; }) => (
              <div key={obj.date}>
                date:
                {obj.date}
                :
                <div>
                  results round:
                  {obj.results.map((i:number) => (
                    <span key={i}>
                      {i}
                      ,
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
        : (
          <div className={style.page}>
            Результат игры:
            {state.sprint.pointsForRound}
            <div>
              <button onClick={newGame} type="button">Играть заново</button>
              {'   '}
              <button onClick={() => setStatistic(true)} type="button">Показать статистику</button>
            </div>
          </div>
        )}
    </>

  );
};

export default Results;
