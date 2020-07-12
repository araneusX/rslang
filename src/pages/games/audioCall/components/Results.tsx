import React, { useContext, useState, useEffect } from 'react';

import style from '../audioCall.module.scss';
import { StateContext } from '../../../../store/stateProvider';
import AudioContext from '../audioContext';
import { StatisticsContext } from '../../../../statistics/statisticsProvider';
import { StatisticsInterface, BackendWordInterface } from '../../../../types';

const Results = () => {
  const UserWordLevel = 6;
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const { state, dispatch } = useContext(StateContext);
  const { getStartWords } = useContext(AudioContext);
  const {
    correctAnswer, errorAnswer, level
  } = state.audioCall;

  const [statistic, setStatistic] = useState(false);
  const [allStatistic, setAllStatistic]:any[] = useState([{}]);

  const newGame = async () => {
    const page = state.audioCall.page < 29 ? state.audioCall.page + 1 : 1;

    const nextWords = await getStartWords(level, level !== UserWordLevel, page);
    const allAnswerArr : string[] = nextWords.map((i : BackendWordInterface) => i.wordTranslate);
    dispatch({
      type: 'SET_AUDIO_NEW_GAME',
      value: {
        level, words: nextWords, allAnswerArray: allAnswerArr, page
      }
    });
  };

  const restartGame = async () => {
    const nextWords = await getStartWords(level, level !== UserWordLevel, state.audioCall.page);
    const allAnswerArr : string[] = nextWords.map((i : BackendWordInterface) => i.wordTranslate);
    dispatch({
      type: 'SET_AUDIO_NEW_GAME',
      value: {
        level, words: nextWords, allAnswerArray: allAnswerArr, page: state.audioCall.page
      }
    });
  };

  useEffect(() => {
    statistics.saveMini('audiochallenge', correctAnswer.length).then((res) => {
      const mini = statistics.getMini('audiochallenge');
      setAllStatistic(mini);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.resultPageWrapper}>
      {statistic ? (
        <div className={style.statisticPage}>
          <div className={style.statisticPageHeader}>
            <button onClick={() => setStatistic(false)} type="button">Назад</button>
            <h4>
              Статистика игры:
            </h4>
          </div>
          <div className={style.statisticPageBody}>
            {allStatistic.map((obj: { date: string, results: number[]; }) => (
              <div key={obj.date}>
                <div className={style.statisticPageDate}>
                  {obj.date}
                </div>

                <div className={style.statisticPagePoints}>
                  {obj.results.map((i:number, index:number) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={i + index}>
                      Угаданно слов:
                      {i}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
        : (
          <div className={style.resultPage}>
            <div className={style.statisticRoundContent}>
              <div>
                <div className={style.correctAnswerBlock}>
                  Знаю:
                  {' '}
                  { correctAnswer.length }
                </div>
                {correctAnswer.map((i:any) => (
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
                  { errorAnswer.length }
                </div>
                {errorAnswer.map((i:any) => (
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
            <div className={style.resultPageBtn}>
              <button onClick={restartGame} type="button">Повторить</button>
              <button onClick={newGame} type="button">Новая игра</button>
              <button onClick={() => setStatistic(true)} type="button">Статистика</button>
            </div>
          </div>
        )}
    </div>

  );
};

export default Results;
