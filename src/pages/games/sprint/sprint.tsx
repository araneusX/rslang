import React, { useContext, useEffect, createContext } from 'react';
import Start from './components/Start';
import Main from './components/Main';
import Results from './components/Results';

import style from './sprint.module.scss';
import { StateContext } from '../../../store/stateProvider';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import { StatisticsInterface, BackendWordInterface, SprintWordInterface } from '../../../types';
import { downloadNewWords, getManyWordsById } from '../../../backend/words';

export const SprintContext = createContext<{
  getStartWords:()=>Promise<SprintWordInterface[]
  >}>(
    {
      getStartWords: async () => []
    });

const Sprint = () => {
  const { state, dispatch } = useContext(StateContext);
  const { screen, selectLevel, level } = state.sprint;

  const statistics = useContext(StatisticsContext) as StatisticsInterface;

  function randomInteger(min:number, max:number) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  const startData = async (_level:number) => {
    const startWith = randomInteger(1, 540);
    const gameWords = await downloadNewWords(_level, startWith, 60);
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

  const getStartWords = async () => {
    let startWord = [];
    if (selectLevel) {
      startWord = await startData(level);
    } else {
      const userLearnedWord = statistics.getAllWordsId();
      if (userLearnedWord.length < 60) {
        startWord = await startData(level);
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
      }
    }
    startDataF();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SprintContext.Provider value={{ getStartWords }}>
      <div className={style.page}>
        {screen === 'start' && <Start />}
        { screen === 'main' && <Main />}
        { screen === 'results' && <Results />}
      </div>

    </SprintContext.Provider>
  );
};

export default Sprint;
