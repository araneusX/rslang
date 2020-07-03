import React, {
  useContext, useRef, useEffect, useState, useMemo
} from 'react';
import style from './total.module.scss';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import { StatisticsInterface, DayInterface } from '../../../types';
import { generateFullDays } from '../../../utils';
import { WORDS_COUNT } from '../../../constants';

const Total = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statistics = useContext(StatisticsContext) as StatisticsInterface;

  const [tile, setTile] = useState({
    x: 0,
    y: 0,
    isArea: false,
    point: 0
  });

  const viewBox = { x: 300, y: 200 };
  const lineWidth = 5;
  const padding = 20;

  const totalStats = useMemo(() => statistics.getAllDayStatistics(), []);

  const days = useMemo<DayInterface[]>(() => {
    const savedDays = statistics.getForEachDayStatistics();
    const allDays = generateFullDays(savedDays);
    for (let i = 1; i < allDays.length; i += 1) {
      allDays[i].newWords += allDays[i - 1].newWords;
    }
    const start = { ...allDays[0] };
    allDays.unshift(start);
    return allDays;
  }, []);

  const totalWords = days[days.length - 1].newWords;
  const ceiling = totalWords > WORDS_COUNT * 0.2
    ? (((viewBox.y - padding) * totalWords) / WORDS_COUNT) - lineWidth
    : ((viewBox.y - padding) * 0.2) - (lineWidth * 2);

  const stepX = (viewBox.x - padding - (lineWidth * 2)) / (days.length - 1);
  const stepY = totalWords > 0 ? ceiling / totalWords : 0;

  const points: { x: number, y: number }[] = [];

  days.forEach((day, i) => {
    points.push({
      x: Math.round((i) * stepX),
      y: Math.round(day.newWords * stepY)
    });
  });

  points[0].y = 0;

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = viewBox.x;
      canvas.height = viewBox.y;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(lineWidth * 2, viewBox.y - (lineWidth * 2));
        points.forEach((point) => {
          ctx.lineTo(point.x + (lineWidth * 2), viewBox.y - point.y - (lineWidth * 2));
        });
        ctx.lineTo(points[points.length - 1].x + (lineWidth * 2), viewBox.y - (lineWidth * 2));
        ctx.closePath();
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = 'orange';
        ctx.fill();

        ctx.strokeStyle = 'black';

        ctx.beginPath();
        ctx.moveTo(lineWidth, 0);
        ctx.lineTo(lineWidth, viewBox.y - lineWidth);
        ctx.lineTo(viewBox.x, viewBox.y - lineWidth);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.lineTo(lineWidth, 0);
        ctx.lineTo(lineWidth * 2, 10);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(viewBox.x - 10, viewBox.y - (lineWidth * 2));
        ctx.lineTo(viewBox.x, viewBox.y - lineWidth);
        ctx.lineTo(viewBox.x - 10, viewBox.y);
        ctx.stroke();
      }
    }
  }, [canvasRef]);

  const handleMouseCanvasMove = (event: any) => {
    if (canvasRef.current) {
      const { x, y } = canvasRef.current.getBoundingClientRect();
      const positionX = event.clientX - x;
      const positionY = viewBox.y - (event.clientY - y);
      points.forEach((point, i) => {
        if ((Math.abs(point.x - positionX) < stepX / 2)) {
          setTile({
            x: positionX,
            y: positionY,
            isArea: positionY - point.y < 10,
            point: i
          });
        }
      });
    }
  };

  const handleMouseCanvasLeave = () => {
    setTile({ ...tile, isArea: false });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.date}>{`${days[0].date} - ${days[days.length - 1].date}`}</div>
      <div className={style.inner_wrapper}>
        <div className={style.count}>
          <div className={style.row}>
            Total words for study:
            <span className={style.value}>
              {WORDS_COUNT}
            </span>
          </div>
          <div className={style.row}>
            Total words studied:
            <span className={style.value}>
              {totalStats.newWords}
            </span>
          </div>
          <div className={style.row}>
            Completed:
            <span className={style.value}>
              {(totalStats.newWords / WORDS_COUNT) * 100 > 10
                ? `${((totalStats.newWords / WORDS_COUNT) * 100).toFixed(1)} %`
                : ' < 10%'}
            </span>
          </div>
        </div>
        <div className={style.graph_wrapper}>
          <span>100%</span>
          <div className={style.graph}>
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseCanvasMove}
              onMouseLeave={handleMouseCanvasLeave}
            />
            {tile.isArea && (
            <div
              className={style.tile}
              style={{
                left: tile.x,
                bottom: tile.y - 50
              }}
            >
              <div>{days[tile.point].date}</div>
              <div>{`Total words: ${days[tile.point].newWords}`}</div>
            </div>
            )}
          </div>
          <div className={style.period}>
            <span>{days[0].date}</span>
            <span>{days[days.length - 1].date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Total;
