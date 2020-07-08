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
        Cards complete:
        <span className={style.value}>
          {statisticsData.cards}
        </span>
      </div>
      <div className={style.row}>
        Right answers:
        <span className={style.value}>
          {`${((statisticsData.right / statisticsData.cards || 0) * 100).toFixed(1)}%`}
        </span>
      </div>
      <div className={style.row}>
        New words:
        <span className={style.value}>
          {statisticsData.newWords}
        </span>
      </div>
      <div className={style.row}>
        Longest streak:
        <span className={style.value}>
          {statisticsData.series}
        </span>
      </div>
    </div>
  );
};

export default Session;
