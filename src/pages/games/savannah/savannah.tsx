import React, { useState, useEffect, useContext } from 'react';
import StartGamePage from './components/StartGamePage';
import SavannahGameWrapper from './components/GameWrapper';
import { StartSavannah, initialSavannah } from './helpers/types';
import { getWords, getManyWordsById } from '../../../backend/words';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../types';
import { StateContext } from '../../../store/stateProvider';

const Savannah = () => {
  const startSavannah: StartSavannah = initialSavannah;

  const [savannah, setSavannah] = useState(startSavannah);
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const { state } = useContext(StateContext);
  const { auth } = state;

  const startData = async (page:number, level:number) => {
    const gameWord = await getWords(page, level);
    setSavannah({
      ...savannah,
      wordForGame: gameWord,
      allAnswerArray: gameWord.map((i:any) => i.wordTranslate)
    });
  };

  useEffect(() => {
    const userLearnedWord = statistics.getAllWordsId();

    if (userLearnedWord.length < 20 || savannah.setLevel) {
      let stateMiniGame: any = localStorage.getItem('stateMiniGame');
      if (stateMiniGame) {
        stateMiniGame = JSON.parse(stateMiniGame);
      } else {
        stateMiniGame = {
          [`savannah-${auth.userId}`]: {
            [savannah.level]: 0
          }

        };
        localStorage.setItem('stateMiniGame', JSON.stringify(stateMiniGame));
      }
      const page = stateMiniGame[`savannah-${auth.userId}`][savannah.level];

      startData(page, savannah.level);
    } else {
      getManyWordsById(userLearnedWord.slice(0, 20)).then((res) => {
        setSavannah({
          ...savannah,
          wordForGame: res.content,
          allAnswerArray: res.content.map((i:any) => i.wordTranslate)
        });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {savannah.startGame
        ? <SavannahGameWrapper savannah={savannah} setSavannah={setSavannah} />
        : <StartGamePage savannah={savannah} setSavannah={setSavannah} />}
    </>
  );
};

export default Savannah;
