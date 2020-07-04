/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';

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

  const handleRadioChange = (value: SpeakitModeType) => {
    const newMode = value;
    dispatch({ type: 'SET_SPEAKIT_MODE', value });
  };

  const handleLevelChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const newLevel: number = Number(target.value);
    dispatch({ type: 'SET_OUR_LEVEL', value: newLevel });
    dispatch({ type: 'SET_OUR_ROUND', value: 0 });
  };

  const handleRoundChange = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement;
    const newRound: number = Number(target.value);
    dispatch({ type: 'SET_OUR_ROUND', value: newRound });
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
    </>
  );
};

export default Main;
