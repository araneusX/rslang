/* eslint-disable react/no-array-index-key */
// eslint-disable-next-line react/no-array-index-key

import React, { useContext, useState } from 'react';
import { StatisticsContext } from '../../../../statistics/statisticsProvider';
import { StateContext } from '../../../../store/stateProvider';
import { OurGameWordInterface, BackendWordInterface, StatisticsInterface } from '../../../../types';
import { downloadNewWords, getManyWordsById } from '../../../../backend/words';

import { Preloader } from '../../../../commonComponents';

import style from './results.module.scss';

type ResultsPropsType = {};

const Results: React.FC<ResultsPropsType> = () => {
  const { state, dispatch } = useContext(StateContext);
  const {
    round, level, words, complete, mode
  } = state.our;

  const statistics = useContext(StatisticsContext) as StatisticsInterface;

  const [isShowStatistics, setShowStatistics] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const right: JSX.Element[] = [];
  const mistakes: JSX.Element[] = [];

  const handleContinue = () => {
    dispatch({ type: 'SET_OUR_SCREEN', value: 'main' });
  };

  const handleRestart = () => {
    const clearWords = words.map((word) => {
      const clearWord = { ...word };
      clearWord.isChosen = false;
      return clearWord;
    });
    dispatch({ type: 'SET_OUR_GAME', value: false });
    dispatch({ type: 'SET_OUR_COMPLETE', value: false });
    dispatch({ type: 'SET_OUR_SCREEN', value: 'main' });
    dispatch({ type: 'SET_OUR_WORDS', value: clearWords });
  };

  const handleNew = async () => {
    setLoading(true);
    dispatch({ type: 'SET_OUR_GAME', value: false });
    dispatch({ type: 'SET_OUR_COMPLETE', value: false });
    let newLevel = level;
    let newRound = round;
    let result;
    if (mode === 'vocabulary') {
      if (round === 59) {
        if (level < 5) {
          newLevel = level + 1;
        } else {
          newLevel = 0;
        }
        newRound = 0;
      } else {
        newRound = round + 1;
      }
      result = await downloadNewWords(newLevel, newRound * 10, 10);
    } else {
      const userWordsIds = statistics.getAllWordsId().slice(0, 10);
      result = await getManyWordsById(userWordsIds);
    }
    if (result.ok) {
      const newWords: OurGameWordInterface[] = result.content.map((word: BackendWordInterface, i:number) => (
        {
          ...word,
          isChosen: false,
          index: i
        }
      ));

      if (!complete) {
        const rightCount = words.reduce((acc, word) => (word.isChosen ? acc + 1 : acc), 0);
        statistics.saveMini('our', rightCount);
      }

      dispatch({ type: 'SET_OUR_WORDS', value: newWords });
      dispatch({ type: 'SET_OUR_ROUND', value: newRound });
      dispatch({ type: 'SET_OUR_LEVEL', value: newLevel });
    } else {
      console.error('BACKEND ERROR: Associations');
    }
    setLoading(false);
    dispatch({ type: 'SET_OUR_SCREEN', value: 'main' });
  };

  const handleStatistics = () => {
    setShowStatistics(!isShowStatistics);
  };

  const handlePlay = (word: OurGameWordInterface) => {
    const audio = new Audio(word.audio);
    audio.play();
  };

  words.forEach((word) => {
    const element = (
      <div
        className={style.item}
        key={word.id}
        onClick={handlePlay.bind(null, word)}
        role="button"
        tabIndex={0}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            handlePlay.bind(null, word);
          }
        }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/sound1.png`} alt="play" />
        <div className={style.value}>{word.word}</div>
        <div className={style.transcription}>{word.transcription}</div>
        <div className={style.translate}>{word.wordTranslate}</div>
      </div>
    );
    if (word.isChosen) {
      right.push(element);
    } else {
      mistakes.push(element);
    }
  });

  return (
    <div className={style.wrapper}>
      {isShowStatistics
        ? (
          <div className={style.items_wrapper}>
            {statistics.getMini('our').map((item) => (
              <div className={style.statistics_date} key={item.date}>
                <span className={style.title}>{item.date}</span>
                {item.results.map((result, i) => (
                  <div className={style.statistics_item} key={i}>
                    {`${i + 1}. `}
                    Верно:
                    <span className={style.right_count}>{result}</span>
                    Надо повторить:
                    <span className={style.mistakes_count}>{10 - result}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )
        : (
          <div className={style.items_wrapper}>
            <div className={style.head}>
              <span className={style.title}>Верно:</span>
              <span className={style.right_count}>{right.length}</span>
            </div>
            {right}
            <div className={style.head}>
              <span className={style.title}>Надо повторить:</span>
              <span className={style.mistakes_count}>{mistakes.length}</span>
            </div>
            {mistakes}
          </div>
        )}
      <div className={style.controls}>
        <button
          onClick={complete ? handleRestart : handleContinue}
          type="button"
          className={`${style.button}`}
        >
          {complete ? 'Начать заново' : 'Продолжить'}
        </button>
        <button
          onClick={handleNew}
          type="button"
          className={`${style.button}`}
        >
          Новая игра
        </button>
        <button
          onClick={handleStatistics}
          type="button"
          className={`${style.button}`}
        >
          {isShowStatistics ? 'Вернуться' : 'Долгосрочная статистика'}
        </button>
      </div>
      {isLoading && <div className={style.preloader}><Preloader /></div>}
    </div>
  );
};

export default Results;
