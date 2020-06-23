import React, { useContext } from 'react';
import style from './stats.module.scss';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../types';

const Full = () => {
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const statisticsData = statistics.getAllDayStatistics();
  return (
    <div className={style.graph}>
      <div>
        Words:
        {statisticsData.newWords}
      </div>
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
  );
};

export default Full;
