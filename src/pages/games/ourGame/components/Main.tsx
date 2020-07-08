/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react';

import style from './main.module.scss';
import { downloadNewWords, getManyWordsById } from '../../../../backend/words';
import {
  BackendWordInterface, OurGameWordInterface, SpeakitModeType, StatisticsInterface, SpeakitWordInterface
} from '../../../../types';

import { StateContext } from '../../../../store/stateProvider';
import { StatisticsContext } from '../../../../statistics/statisticsProvider';

type MainPropsType = {};

const Main: React.FC<MainPropsType> = () => {
  const { state, dispatch } = useContext(StateContext);
  const {
    round, level, words, game, mode
  } = state.our;

  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const isUserWords = (statistics.getAllWordsStatistics()).length >= 10;

  const [current, setCurrent] = useState<OurGameWordInterface>();

  const partOfUrl = 'https://raw.githubusercontent.com/araneusx/rslang-data/master/data/';

  if (!isUserWords && mode === 'user') {
    dispatch({ type: 'SET_OUR_MODE', value: 'vocabulary' });
  }

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      let result: any;
      if (mode === 'user' && isUserWords) {
        const userWordsIds = statistics.getAllWordsId().slice(0, 5);
        result = await getManyWordsById(userWordsIds);
      } else {
        result = await downloadNewWords(level, round * 10, 5);
      }
      if (!ignore) {
        if (result.ok) {
          const newWords: OurGameWordInterface[] = result.content.map((word: BackendWordInterface, i:number) => (
            {
              ...word,
              sound: new Audio(`https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${word.audio.slice(6)}`),
              isRecognized: false,
              index: i
            }
          ));
          setCurrent(newWords[0]);
          dispatch({ type: 'SET_OUR_WORDS', value: newWords });
        } else {
          console.log('BACKEND ERROR: Speak It');
        }
      }
    }

    if (words.length === 0) {
      fetchData();
    } else {
      setCurrent(words[0]);
    }
    return () => { ignore = true; };
  }, []);

  const setNewWords = async (
    newLevel: number,
    newRound: number,
    newMode: SpeakitModeType
  ) => {
    let result: any;
    if (newMode === 'user' && isUserWords) {
      const userWordsIds = statistics.getAllWordsId().slice(0, 5);
      result = await getManyWordsById(userWordsIds);
    } else {
      result = await downloadNewWords(newLevel, newRound * 10, 5);
    }
    if (result.ok) {
      const newWords: OurGameWordInterface[] = result.content.map((word: BackendWordInterface, i:number) => (
        {
          ...word,
          isChosen: false,
          index: i
        }
      ));
      const right = words.reduce((acc, word) => (word.isChosen ? acc + 1 : acc), 0);
      statistics.saveMini('our', right);
      dispatch({ type: 'SET_OUR_GAME', value: false });
      dispatch({ type: 'SET_OUR_COMPLETE', value: false });
      dispatch({ type: 'SET_OUR_WORDS', value: newWords });
      setCurrent(newWords[0]);
    } else {
      console.log('BACKEND ERROR: Associations');
    }
  };

  const handleRadioChange = (value: SpeakitModeType) => {
    const newMode = value;
    setNewWords(level, round, newMode);
    dispatch({ type: 'SET_OUR_MODE', value });
  };

  const handleLevelChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const newLevel: number = Number(target.value);
    dispatch({ type: 'SET_OUR_LEVEL', value: newLevel });
    dispatch({ type: 'SET_OUR_ROUND', value: 0 });
    setNewWords(newLevel, 0, 'vocabulary');
  };

  const handleRoundChange = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    const newRound: number = Number(target.value);
    dispatch({ type: 'SET_OUR_ROUND', value: newRound });
    setNewWords(newRound, 0, 'vocabulary');
  };

  return (
    <>
      <form
        className={style.levels}
      >
        <div className={style.radio}>
          <label htmlFor="radio-user">
            My words
            <input
              type="radio"
              id="radio-user"
              value="user"
              checked={mode === 'user'}
              disabled={!isUserWords}
              onChange={handleRadioChange.bind(null, 'user')}
            />
          </label>
          <label htmlFor="radio-vocabulary">
            Vocabulary
            <input
              type="radio"
              id="radio-vocabulary"
              value="vocabulary"
              checked={mode === 'vocabulary'}
              onChange={handleRadioChange.bind(null, 'vocabulary')}
            />
          </label>
        </div>
        {
              mode === 'vocabulary'
              && (
              <div className={style.selects}>
                <select onChange={handleLevelChange} defaultValue={`${level}`}>
                  {(new Array(6)).fill('').map((v, i) => (
                    <option value={`${i}`} key={`${i}`}>{i + 1}</option>
                  ))}
                </select>
                <select onChange={handleRoundChange} defaultValue={`${round}`}>
                  {(new Array(60)).fill('').map((v, i) => (
                    <option value={`${i}`} key={`${i}`}>{i + 1}</option>
                  ))}
                </select>
              </div>
              )
            }
      </form>
      {
        current !== undefined
        && (
          <div className={style.wrapper}>
            <div className={style.screen}>
              <div className={style.images}>
                {words.map((word: OurGameWordInterface, i:number) => {
                  let classNames = `${style.imageCardWrapper}`;
                  if (!game) {
                    if (word.index === current.index) {
                      classNames += ` ${style.current}`;
                    } else {
                      classNames += ` ${style.usual}`;
                    }
                  } else if (word.isChosen) {
                    classNames += ` ${style.recognized}`;
                  }
                  return (
                    <div
                      className={`${classNames}`}
                      key={word.id}
                      role={game ? undefined : 'button'}
                      tabIndex={game ? undefined : 0}
                    >
                      <img className={`${style.imageCard} ${word.word}`} src={`${partOfUrl}${word.image.slice(6)}`} alt="some" />
                      <p>{word.textMeaning}</p>
                    </div>
                  );
                })}
              </div>
              <div className={style.words}>
                {words.map((word: OurGameWordInterface, i:number) => {
                  let classNames = `${style.word}`;
                  if (!game) {
                    if (word.index === current.index) {
                      classNames += ` ${style.current}`;
                    } else {
                      classNames += ` ${style.usual}`;
                    }
                  } else if (word.isChosen) {
                    classNames += ` ${style.recognized}`;
                  }
                  return (
                    <div
                      className={classNames}
                      key={word.id}
                      role={game ? undefined : 'button'}
                      tabIndex={game ? undefined : 0}
                    >
                      <div className={style.wordInnerWrapper}>
                        <div className={style.value}>{word.word}</div>
                        <div className={style.transcription}>{word.transcription}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={style.controls}>
                <div
                  className={style.button}
                >
                  Restart
                </div>
                <button className={style.button} type="button">Results</button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Main;
