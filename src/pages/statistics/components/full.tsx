import React, { useContext, useMemo } from 'react';
import style from './full.module.scss';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../types';
import { generateFullDays } from '../../../utils';

const Full = () => {
  const statistics = useContext(StatisticsContext) as StatisticsInterface;

  const viewBox = { x: 500, y: 400 };
  const padding = 100;

  const totalStats = useMemo(() => statistics.getAllDayStatistics(), []);
  const savedDays = useMemo(() => statistics.getForEachDayStatistics(), []);
  const fullDays = useMemo(() => generateFullDays(savedDays), [savedDays]);
  const days = [...fullDays];
  if (fullDays.length < 2) {
    const start = { ... fullDays[0], newWords: 0, cards: 0 };
    days.unshift(start);
  }

  const maxCards = useMemo(() => days.reduce((acc, day) => (
    acc < day.cards + day.newWords ? day.cards + day.newWords : acc),
  0), [days]);

  const minCards = useMemo(() => days.reduce((acc, day) => (
    acc > day.cards + day.newWords ? day.cards + day.newWords : acc),
  0), [days]);

  const stepX = (viewBox.x - padding * 2) / (days.length - 1);
  const stepY = (viewBox.y - padding * 2) / ((maxCards - minCards) || 1);

  const points = useMemo(() => days.map((day, i) => ({
    x: Math.round((i * stepX) + padding),
    y: Math.round(viewBox.y - padding - (day.cards * stepY))
  })), [days]);

  let path = `M ${padding} ${viewBox.y - padding}`;
  points.forEach((point, i) => {
    path += ` L ${point.x} ${point.y}`;
  });

  return (
    <div className={style.wrapper}>
      <div className={style.date}>{`${days[0].date} - ${days[days.length - 1].date}`}</div>
      <div className={style.inner_wrapper}>
        <div className={style.count}>
          <div className={style.row}>
            Прошло дней от начала обучения:
            <span className={style.value}>
              {fullDays.length}
            </span>
          </div>
          <div className={style.row}>
            Всего карточек просмотрено:
            <span className={style.value}>
              {totalStats.cards}
            </span>
          </div>
          <div className={style.row}>
            Всего слов изучено:
            <span className={style.value}>
              {totalStats.newWords}
            </span>
          </div>
        </div>
        <div className={style.graph_wrapper}>
          <span className={style.max}>Max. cards</span>
          <div className={style.graph}>
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
                    }`
                  }
                stroke="black"
                strokeWidth="3"
                fill="transparent"
              />
              <path
                d={
                    `M ${
                      viewBox.x - (padding / 2) - 6} ${viewBox.y - padding + 14
                    } L ${
                      viewBox.x - (padding / 2)} ${viewBox.y - padding + 10
                    } ${viewBox.x - (padding / 2) - 6} ${viewBox.y - padding + 6}`
                  }
                stroke="black"
                strokeWidth="3"
                fill="transparent"
              />

              <path
                d={
                    `M ${
                      padding - 14} ${padding - 3
                    } L ${
                      padding - 10} ${padding - 10
                    } ${padding - 6} ${padding - 3}`
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
                      style={{ fill: 'white', stroke: 'black', opacity: 0.8 }}
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
                      {`Карточек: ${day.cards}`}
                    </text>
                    <text
                      x={points[i].x - 40}
                      y={points[i].y + 80}
                    >
                      {`Новых слов: ${day.newWords}`}
                    </text>
                  </g>
                </g>
              ))}
            </svg>
          </div>
          <div className={style.period}>
            <span>{days[0].date}</span>
            <span>{days[days.length - 1].date}</span>
          </div>
        </div>
      </div>
      <div className={style.message}>
        Наведите курсор на точку на графике, чтобы получить больше информации.
      </div>
    </div>

  );
};

export default Full;
