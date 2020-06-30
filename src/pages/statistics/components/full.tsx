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
  const viewBox = { x: 400, y: 400 };
  const padding = 50;
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
          <g
          // eslint-disable-next-line react/no-array-index-key
            key={i}

          >
            <circle
              className={style.point}
              cx={points[i].x}
              cy={points[i].y}
              r={5}
              stroke="black"
              strokeWidth="2"
            />

            <text
              className={style.text}
              x={points[i].x - 5}
              y={points[i].y + 20}
            >
              {day.date}
            </text>
          </g>
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
