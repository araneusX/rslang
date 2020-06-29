import React, { useContext, useRef } from 'react';
import style from './full.module.scss';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../types';

const Full = () => {
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  // const statisticsData = statistics.getAllDayStatistics();
  const days = statistics.getForEachDayStatistics();
  if (days.length < 2) {
    const firstDay = { ...days[0] };
    days.push(firstDay);
  }
  const maxCards = days.reduce((acc, day) => (
    acc < day.cards + day.newWords ? day.cards + day.newWords : acc),
  0);
  const minCards = days.reduce((acc, day) => (
    acc > day.cards + day.newWords ? day.cards + day.newWords : acc),
  0);
  const viewBox = { x: 300, y: 300 };
  const padding = 10;
  const stepX = (viewBox.x - padding * 2) / (days.length - 1);
  const stepY = (viewBox.y - padding * 2) / ((maxCards - minCards) || 1);
  const points = days.map((day, i) => ({
    x: ((i * stepX) + padding),
    y: viewBox.y - padding - (day.cards * stepY)
  }));
  let path = `M ${padding} ${viewBox.x - padding}`;
  points.forEach((point, i) => {
    path += ` L ${point.x} ${point.y}`;
  });
  return (
    <div className={style.wrapper}>
      <svg
        className={style.graph}
        viewBox={`0 0 ${viewBox.x} ${viewBox.y}`}
      >
        <path d={path} stroke="black" strokeWidth="2" fill="transparent" />
        {days.map((day, i) => (
          <circle
            cx={(i * stepX) + padding}
            cy={(viewBox.y - padding) - (day.cards * stepY)}
            r={5}
            stroke="black"
            strokeWidth="2"
            fill="red"
            // eslint-disable-next-line react/no-array-index-key
            key={i}
          />
        ))}
      </svg>
      {/* <div>
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
      </div> */}
    </div>
  );
};

export default Full;
