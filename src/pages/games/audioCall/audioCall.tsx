import React, { useState, useContext, useEffect } from 'react';
import Start from './components/Start';
import Main from './components/Main';
import Results from './components/Results';
import { StateContext } from '../../../store/stateProvider';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import AudioContext from './audioContext';

import style from './audioCall.module.scss';
import { Preloader } from '../../../commonComponents';
import { StatisticsInterface, BackendWordInterface } from '../../../types';
import { getManyWordsById, downloadNewWords } from '../../../backend/words';

const AudioCall = () => {
  const { state, dispatch } = useContext(StateContext);
  const { screen } = state.audioCall;
  const [isLoading, setIsLoading] = useState(true);

  const statistics = useContext(StatisticsContext) as StatisticsInterface;

  const startData = async (_level:number, _round: number) => {
    const startWith = _round * 20;
    const gameWords = await downloadNewWords(_level === 6 ? 0 : _level, startWith, 20);
    return gameWords.content;
  };

  const getStartWords = async (_level: number = 0, _selectLevel:boolean = false, _round: number = 1) => {
    let startWord = [];
    if (_selectLevel) {
      startWord = await startData(_level, _round);
    } else {
      const userLearnedWord = statistics.getAllWordsId();
      if (userLearnedWord.length < 20) {
        startWord = await startData(_level, _round);
      } else {
        const userWord = await getManyWordsById(userLearnedWord.slice(0, 20));
        startWord = userWord.content;
      }
    }
    return startWord;
  };

  useEffect(() => {
    async function startDataF() {
      const wordForGame = await getStartWords();
      if (wordForGame.length) {
        let level = 0;
        const allAnswerArray : string[] = wordForGame.map((i : BackendWordInterface) => i.wordTranslate);
        if (statistics.getAllWordsId().length > 20) {
          level = 6;
        }
        dispatch({ type: 'SET_AUDIO_WORDS', value: { words: wordForGame, allAnswerArray, level } });
        setIsLoading(false);
      }
    }
    startDataF();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AudioContext.Provider value={{ getStartWords }}>
      {isLoading ? <Preloader /> : null}
      <div className={style.wrap}>
        {screen === 'start' && <Start />}
        { screen === 'main' && <Main />}
        { screen === 'results' && <Results />}
      </div>

    </AudioContext.Provider>
  );
};

export default AudioCall;
