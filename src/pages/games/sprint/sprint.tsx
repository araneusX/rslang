import React, { useContext, useEffect, useState } from 'react';
import Start from './components/Start';
import Main from './components/Main';
import Results from './components/Results';

import style from './sprint.module.scss';
import { StateContext } from '../../../store/stateProvider';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import { StatisticsInterface, BackendWordInterface } from '../../../types';
import { downloadNewWords, getManyWordsById } from '../../../backend/words';
import SprintContext from './sprintContext';
import { Preloader } from '../../../commonComponents';

const Sprint = () => {
  const { state, dispatch } = useContext(StateContext);
  const { screen } = state.sprint;
  const [isLoading, setIsLoading] = useState(true);

  const statistics = useContext(StatisticsContext) as StatisticsInterface;

  function randomInteger(min:number, max:number) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  const startData = async (_level:number, _round: number) => {
    const startWith = _round * 60;
    const gameWords = await downloadNewWords(_level === 6 ? 0 : _level, startWith, 60);
    return gameWords.content;
  };

  const setAnswerForUserToWordArray = (wordsArray:BackendWordInterface[]) => {
    const allAnswer = wordsArray.map((obj) => obj.wordTranslate);

    const wordsArrayWithAnswer = wordsArray.map((obj) => {
      if (Math.round(Math.random())) {
        const answerToUser = allAnswer[randomInteger(0, (allAnswer.length - 1))];
        return { ...obj, answerToUser };
      }
      return { ...obj, answerToUser: obj.wordTranslate };
    });

    return wordsArrayWithAnswer;
  };

  const getStartWords = async (_level: number = 0, _selectLevel:boolean = false, _round: number = 1) => {
    let startWord = [];
    if (_selectLevel) {
      startWord = await startData(_level, _round);
    } else {
      const userLearnedWord = statistics.getAllWordsId();
      if (userLearnedWord.length < 60) {
        startWord = await startData(_level, _round);
      } else {
        const userWord = await getManyWordsById(userLearnedWord.slice(0, 60));
        startWord = userWord.content;
      }
    }

    if (startWord.length) {
      const wordToGame = setAnswerForUserToWordArray(startWord);
      return wordToGame;
    }
    return [];
  };

  useEffect(() => {
    async function startDataF() {
      const wordForGame = await getStartWords();
      if (wordForGame.length) {
        dispatch({ type: 'SET_SPRINT_WORDS', value: wordForGame });
        setIsLoading(false);
      }
    }
    startDataF();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SprintContext.Provider value={{ getStartWords }}>
      {isLoading ? <Preloader /> : null}
      <div className={style.wrap}>
        {screen === 'start' && <Start />}
        { screen === 'main' && <Main />}
        { screen === 'results' && <Results />}
      </div>

    </SprintContext.Provider>
  );
};

export default Sprint;
