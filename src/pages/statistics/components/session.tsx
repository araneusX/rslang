import React, { useContext } from 'react';
import style from './stats.module.scss';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../types';

const Session = () => {
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const statisticsData = statistics.getDayStatistics();
  return (
    <div className={style.session}>
      <div className={style.stats}>
        <div>
          Cards complete:
          {statisticsData.cards}
        </div>
        <div>
          Right answers:
          {statisticsData.right}
        </div>
        <div>
          Longest streak:
          {statisticsData.series}
        </div>
      </div>
    </div>
  );
};

export default Session;
