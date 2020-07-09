import React, { useContext, useState, useEffect } from 'react';
import { initialSavannah, StartSavannah, WordForGame } from '../helpers/types';
import { getWords, getManyWordsById } from '../../../../backend/words';
import { StatisticsContext } from '../../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../../types';

import style from '../savannah.module.scss';

interface Props {
  savannah: StartSavannah,
  setSavannah: (val: StartSavannah)=>void
}

const StatisticGame = (props:Props) => {
  const { savannah, setSavannah } = props;
  const statistics = useContext(StatisticsContext) as StatisticsInterface;

  const [viewStatistic, setViewStatistic] = useState(false);
  const [allStatistic, setAllStatistic]:any[] = useState([{}]);

  const newGame = async () => {
    const userLearnedWord = statistics.getAllWordsId();

    if (userLearnedWord.length < 20 || savannah.setLevel) {
      const page = savannah.page === 29 ? 1 : savannah.page + 1;
      const nextWordForGame = await getWords(page, savannah.level);

      setSavannah({
        ...initialSavannah,
        page,
        selectPage: page,
        repeatGame: true,
        wordForGame: nextWordForGame,
        allAnswerArray: nextWordForGame.map((i:WordForGame) => i.wordTranslate)
      });
    } else {
      await getManyWordsById(userLearnedWord.slice(0, 20)).then((res) => {
        const nextWordForGame = res.content;
        setSavannah({
          ...initialSavannah,
          level: 6,
          repeatGame: true,
          wordForGame: nextWordForGame,
          allAnswerArray: nextWordForGame.map((i:WordForGame) => i.wordTranslate)
        });
      });
    }
  };

  const repeatGame = async () => {
    const userLearnedWord = statistics.getAllWordsId();

    if (userLearnedWord.length < 20 || savannah.setLevel) {
      const { page } = savannah;
      const nextWordForGame = await getWords(page, savannah.level);

      setSavannah({
        ...initialSavannah,
        repeatGame: true,
        wordForGame: nextWordForGame,
        allAnswerArray: nextWordForGame.map((i:WordForGame) => i.wordTranslate)
      });
    } else {
      await getManyWordsById(userLearnedWord.slice(0, 20)).then((res) => {
        const nextWordForGame = res.content;
        setSavannah({
          ...initialSavannah,
          level: 6,
          repeatGame: true,
          wordForGame: nextWordForGame,
          allAnswerArray: nextWordForGame.map((i:WordForGame) => i.wordTranslate)
        });
      });
    }
  };

  const getStatistics = () => {
    if (allStatistic.length) {
      setViewStatistic(true);
    }
  };

  const correctAnswerArr = savannah.wordForGame.filter((i) => savannah.correctAnswer.includes(i.wordTranslate));
  const errorAnswerArr = savannah.wordForGame.filter((i) => savannah.errorAnswerArray.includes(i.wordTranslate));

  useEffect(() => {
    statistics.saveMini('savannah', savannah.correctAnswer.length).then((res) => {
      const mini = statistics.getMini('savannah');
      setAllStatistic(mini);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.statisticWrapper}>
      {viewStatistic
        ? (
          <div className={style.statisticRound}>
            <div className={style.statisticRoundContent}>
              {allStatistic.map((obj: { date: string, results: number[]; }) => (
                <div key={obj.date}>
                  <span className={style.statisticRoundContentDate}>
                    Дата:
                    {obj.date}
                    :
                  </span>
                  <div>
                    Правильных ответов в раунде:
                    {obj.results.map((i:number, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <span key={index}>
                        {i}
                        ,
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className={style.btnBackStatistic} onClick={() => setViewStatistic(false)} type="button">Назад</button>
          </div>
        )

        : (
          <div className={style.statisticRound}>
            <div className={style.statisticRoundContent}>
              <div>
                <div className={style.correctAnswerBlock}>
                  Знаю:
                  {' '}
                  { savannah.correctAnswer.length }
                </div>
                {correctAnswerArr.map((i:any) => (
                  <li key={i.id}>
                    {i.word}
                    {' '}
                    {i.transcription}
                    {' '}
                    {i.wordTranslate}
                  </li>
                ))}
              </div>
              <div>
                <div className={style.errorAnswerBlock}>
                  Не знаю:
                  {' '}
                  { savannah.errorAnswerArray.length }
                </div>
                {errorAnswerArr.map((i:any) => (
                  <li key={i.id}>
                    {i.word}
                    {' '}
                    {i.transcription}
                    {' '}
                    {i.wordTranslate}
                  </li>
                ))}
              </div>
            </div>
            <div className={style.statisticRoundBtn}>
              <button onClick={newGame} type="button">Продолжить</button>
              <button onClick={repeatGame} type="button">Повтор</button>
              <button onClick={getStatistics} type="button">Cтатистика</button>
            </div>
          </div>
        )}
    </div>
  );
};

export default StatisticGame;
