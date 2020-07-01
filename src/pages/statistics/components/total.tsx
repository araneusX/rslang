import React, { useContext } from 'react';
import style from './total.module.scss';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../types';
import { generateFullDays } from '../../../utils';
import { WORDS_COUNT } from '../../../constants';

const Total = () => {
  const statistics = useContext(StatisticsContext) as StatisticsInterface;

  const viewBox = { x: 400, y: 400 };

  const savedDays = statistics.getForEachDayStatistics();
  const totalWords = statistics.getAllWordsStatistics().length;
  const ceiling = totalWords > WORDS_COUNT * 0.7
    ? (viewBox.y * totalWords) / WORDS_COUNT
    : viewBox.y * 0.7;

  const days = generateFullDays(savedDays);

  const stepX = viewBox.x / (days.length - 1);
  const stepY = ceiling / totalWords;

  const points: { x: number, y: number }[] = [{ x: 0, y: 0 }];
  for (let i = 1; i < days.length + 1; i += 1) {
    points.push({
      x: Math.round(i * stepX),
      y: points[i - 1].y + Math.round(days[i - 1].newWords * stepY)
    });
    console.log(days[i - 1].newWords);
  }

  const startPoint = points.shift() as { x: number, y: number };
  let path = `M ${startPoint.x} ${viewBox.y - startPoint.y}`;
  points.forEach((point) => {
    path += ` L ${point.x} ${viewBox.y - point.y}`;
  });

  return (
    <div className={style.wrapper}>
      <svg
        className={style.graph}
        viewBox={`0 0 ${viewBox.x} ${viewBox.y}`}
      >
        <path d={path} stroke="black" strokeWidth="2" fill="transparent" />
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

export default Total;
