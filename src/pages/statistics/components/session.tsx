import React, { useContext } from 'react';
import style from './session.module.scss';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../types';
import { getFormattedDate } from '../../../utils';

const Session = () => {
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const statisticsData = statistics.getDayStatistics();
  return (
    <div className={style.wrapper}>
      <div className={style.date}>{getFormattedDate()}</div>
      <div className={style.row}>
        Карточек просмотрено:
        <span className={style.value}>
          {statisticsData.cards}
        </span>
      </div>
      <div className={style.row}>
        Карточек пройдено успешно:
        <span className={style.value}>
          {`${((statisticsData.right / statisticsData.cards || 0) * 100).toFixed(1)}%`}
        </span>
      </div>
      <div className={style.row}>
        Изучено слов:
        <span className={style.value}>
          {statisticsData.newWords}
        </span>
      </div>
      <div className={style.row}>
        Самая длинная серия правильных ответов:
        <span className={style.value}>
          {statisticsData.series}
        </span>
      </div>
    </div>
  );
};

export default Session;
