/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react';

import style from './main.module.scss';
import { downloadNewWords, getManyWordsById } from '../../../../backend/words';
import {
  BackendWordInterface, OurGameWordInterface, SpeakitModeType, StatisticsInterface
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

  if (!isUserWords && mode === 'user') {
    dispatch({ type: 'SET_OUR_MODE', value: 'vocabulary' });
  }

  const setNewWords = async (
    newLevel: number,
    newRound: number,
    newMode: SpeakitModeType
  ) => {
    let result: any;
    if (newMode === 'user' && isUserWords) {
      const userWordsIds = statistics.getAllWordsId().slice(0, 10);
      result = await getManyWordsById(userWordsIds);
    } else {
      result = await downloadNewWords(newLevel, newRound * 10, 10);
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
                {}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Main;
