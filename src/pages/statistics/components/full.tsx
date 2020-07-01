import React, { useContext } from 'react';
import style from './full.module.scss';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../types';
import { generateFullDays } from '../../../utils';

const Full = () => {
  const statistics = useContext(StatisticsContext) as StatisticsInterface;

  const viewBox = { x: 500, y: 400 };
  const padding = 100;

  const savedDays = statistics.getForEachDayStatistics();
  const days = generateFullDays(savedDays);

  const maxCards = days.reduce((acc, day) => (
    acc < day.cards + day.newWords ? day.cards + day.newWords : acc),
  0);
  const minCards = days.reduce((acc, day) => (
    acc > day.cards + day.newWords ? day.cards + day.newWords : acc),
  0);
  const stepX = (viewBox.x - padding * 2) / (days.length - 1);
  const stepY = (viewBox.y - padding * 2) / ((maxCards - minCards) || 1);
  const points = days.map((day, i) => ({
    x: Math.round((i * stepX) + padding),
    y: Math.round(viewBox.y - padding - (day.cards * stepY))
  }));
  let path = `M ${padding} ${viewBox.y - padding}`;
  points.forEach((point, i) => {
    path += ` L ${point.x} ${point.y}`;
  });
  return (
    <div className={style.wrapper}>
      <svg
        className={style.graph}
        viewBox={`0 0 ${viewBox.x} ${viewBox.y}`}
      >
        <path
          d={
            `M ${
              padding - 10} ${padding - 10
            } V ${
              viewBox.y - padding + 10
            } H ${
              viewBox.x - (padding / 2)
            } L ${
              viewBox.x - (padding / 2) - 5} ${viewBox.y - padding + 12
            } ${viewBox.x - (padding / 2) - 5} ${viewBox.y - padding + 8
            } ${viewBox.x - (padding / 2)} ${viewBox.y - padding + 10}`
          }
          stroke="black"
          strokeWidth="3"
          fill="transparent"
        />
        <path d={path} stroke="black" strokeWidth="2" fill="transparent" />
        {days.map((day, i) => (
          <circle
            // eslint-disable-next-line react/no-array-index-key
            key={`c${i}`}
            className={style.backPoint}
            cx={points[i].x}
            cy={points[i].y}
            r={5}
            fill="red"
            stroke="black"
            strokeWidth="2"
          />
        ))}
        {days.map((day, i) => (
          <g
          // eslint-disable-next-line react/no-array-index-key
            key={`t${i}`}
          >
            <circle
              className={style.point}
              cx={points[i].x}
              cy={points[i].y}
              r={5}
            />
            <g className={style.text}>
              <rect
                x={points[i].x - 55}
                y={points[i].y + 30}
                rx="5"
                ry="5"
                width="150"
                height="60"
                style={{ fill: 'white', stroke: 'black', opacity: 0.5 }}
              />
              <text
                x={points[i].x - 40}
                y={points[i].y + 50}
              >
                {day.date}
              </text>
              <text
                x={points[i].x - 40}
                y={points[i].y + 65}
              >
                {`Cards: ${day.cards}`}
              </text>
              <text
                x={points[i].x - 40}
                y={points[i].y + 80}
              >
                {`New words: ${day.newWords}`}
              </text>
            </g>
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
