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

  const viewBox = { x: 400, y: 400 };
  const lineWidth = 2;

  const days = useMemo<DayInterface[]>(() => {
    const savedDays = statistics.getForEachDayStatistics();
    const allDays = generateFullDays(savedDays);
    for (let i = 1; i < allDays.length; i += 1) {
      allDays[i].newWords += allDays[i - 1].newWords;
    }
    return allDays;
  }, []);

  const totalWords = days[days.length - 1].newWords;
  const ceiling = totalWords > WORDS_COUNT * 0.7
    ? ((viewBox.y * totalWords) / WORDS_COUNT) - lineWidth
    : (viewBox.y * 0.7) - lineWidth;

  const stepX = viewBox.x / (((days.length - 1) - 1) || 1);
  const stepY = ceiling / totalWords;

  const points: { x: number, y: number }[] = [{ x: 0, y: 0 }];

  days.forEach((day, i) => {
    points.push({
      x: Math.round((i - 1) * stepX),
      y: Math.round(day.newWords * stepY)
    });
  });

  const startPoint = points.shift() as { x: number, y: number };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = viewBox.x;
      canvas.height = viewBox.y;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, viewBox.y - startPoint.y - lineWidth);
        points.forEach((point) => {
          ctx.lineTo(point.x, viewBox.y - point.y - lineWidth);
        });
        ctx.lineTo(points[points.length - 1].x, viewBox.y - startPoint.y - lineWidth);
        ctx.closePath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fill();
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
