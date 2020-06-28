import React, { useContext, useState } from 'react';
import { StateContext } from '../../../../store/stateProvider';

import style from './results.module.scss';
import { SpeakitWordInterface, BackendWordInterface, StatisticsInterface } from '../../../../types';
import { downloadNewWords, getManyWordsById } from '../../../../backend/words';
import { StatisticsContext } from '../../../../statistics/statisticsProvider';

type ResultsPropsType = {};

const Results: React.FC<ResultsPropsType> = () => {
  const { state, dispatch } = useContext(StateContext);
  const {
    round, level, words, complete, mode
  } = state.speakit;

  const statistics = useContext(StatisticsContext) as StatisticsInterface;

  const [isShowStatistics, setShowStatistics] = useState(false);

  const right: JSX.Element[] = [];
  const mistakes: JSX.Element[] = [];

  const handleContinue = () => {
    dispatch({ type: 'SET_SPEAKIT_SCREEN', value: 'main' });
  };

  const handleRestart = () => {
    const clearWords = words.map((word) => {
      const clearWord = { ...word };
      clearWord.isRecognized = false;
      return clearWord;
    });
    dispatch({ type: 'SET_SPEAKIT_GAME', value: false });
    dispatch({ type: 'SET_SPEAKIT_COMPLETE', value: false });
    dispatch({ type: 'SET_SPEAKIT_SCREEN', value: 'main' });
    dispatch({ type: 'SET_SPEAKIT_WORDS', value: clearWords });
  };

  const handleNew = async () => {
    dispatch({ type: 'SET_SPEAKIT_GAME', value: false });
    dispatch({ type: 'SET_SPEAKIT_COMPLETE', value: false });
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
      const newWords: SpeakitWordInterface[] = result.content.map((word: BackendWordInterface, i:number) => (
        {
          ...word,
          sound: new Audio(`https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${word.audio.slice(6)}`),
          isRecognized: false,
          index: i
        }
      ));

      if (!complete) {
        const rightCount = words.reduce((acc, word) => (word.isRecognized ? acc + 1 : acc), 0);
        statistics.saveMini('speakit', rightCount);
      }

      dispatch({ type: 'SET_SPEAKIT_WORDS', value: newWords });
      dispatch({ type: 'SET_SPEAKIT_ROUND', value: newRound });
      dispatch({ type: 'SET_SPEAKIT_LEVEL', value: newLevel });
    } else {
      console.log('BACKEND ERROR: Speak It');
    }
    dispatch({ type: 'SET_SPEAKIT_SCREEN', value: 'main' });
  };

  const handleStatistics = () => {
    setShowStatistics(!isShowStatistics);
  };

  const handlePlay = (word: SpeakitWordInterface) => {
    word.sound.play();
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
    if (word.isRecognized) {
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
            {statistics.getMini('speakit').map((item) => (
              <div className={style.statistics_date} key={item.date}>
                <span className={style.title}>{item.date}</span>
                {item.results.map((result, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className={style.statistics_item} key={i}>
                    {`${i + 1}. `}
                    Right answers:
                    <span className={style.right_count}>{result}</span>
                    Mistakes:
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
              <span className={style.title}>Right answers</span>
              <span className={style.right_count}>{right.length}</span>
            </div>
            {right}
            <div className={style.head}>
              <span className={style.title}>Mistakes</span>
              <span className={style.mistakes_count}>{mistakes.length}</span>
            </div>
            {mistakes}
          </div>
        )}
      <div className={style.controls}>
        <button
          className={style.button}
          type="button"
          onClick={complete ? handleRestart : handleContinue}
        >
          {complete ? 'Restart' : 'Continue'}
        </button>
        <button className={style.button} type="button" onClick={handleNew}>New Game</button>
        <button className={style.button} type="button" onClick={handleStatistics}>
          {isShowStatistics ? 'Results' : 'Statistics'}
        </button>
      </div>
    </div>
  );
};

export default Results;
