import React, { useContext } from 'react';
import { StateContext } from '../../../../store/stateProvider';

import style from './results.module.scss';
import { SpeakitWordInterface, BackendWordInterface } from '../../../../types';
import { downloadNewWords } from '../../../../backend/words';

type ResultsPropsType = {};

const Results: React.FC<ResultsPropsType> = () => {
  const { state, dispatch } = useContext(StateContext);
  const {
    round, level, words, complete
  } = state.speakit;

  const right: JSX.Element[] = [];
  const mistakes: JSX.Element[] = [];

  words.forEach((word) => {
    const element = (
      <div className={style.item} key={word.id}>
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
    let newLevel: number = level;
    let newRound: number = round;
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
    const result: any = await downloadNewWords(newLevel, newRound * 10, 10);
    if (result.ok) {
      const newWords: SpeakitWordInterface[] = result.content.map((word: BackendWordInterface, i:number) => (
        {
          ...word,
          sound: new Audio(`https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${word.audio.slice(6)}`),
          isRecognized: false,
          index: i
        }
      ));

      dispatch({ type: 'SET_SPEAKIT_WORDS', value: newWords });
      dispatch({ type: 'SET_SPEAKIT_ROUND', value: newRound });
      dispatch({ type: 'SET_SPEAKIT_LEVEL', value: newLevel });
    } else {
      console.log('BACKEND ERROR: Speak It');
    }
    dispatch({ type: 'SET_SPEAKIT_SCREEN', value: 'main' });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.item_wrapper}>
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
      <div className={style.controls}>
        <button
          className={style.button}
          type="button"
          onClick={complete ? handleRestart : handleContinue}
        >
          {complete ? 'Restart' : 'Continue'}
        </button>
        <button className={style.button} type="button" onClick={handleNew}>New Game</button>
        <button className={style.button} type="button">Statistics</button>
      </div>
    </div>
  );
};

export default Results;
