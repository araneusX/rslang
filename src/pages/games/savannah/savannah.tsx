import React, { useState, useEffect } from 'react';
import StartGamePage from './components/StartGamePage';
import SavannahGameWrapper from './components/GameWrapper';
import { StartSavannah, initialSavannah } from './helpers/types';
import { getWords } from '../../../backend/words';

const Savannah = () => {
  const startSavannah: StartSavannah = initialSavannah;

  const [savannah, setSavannah] = useState(startSavannah);

  const startData = async (page:number, level:number) => {
    const gameWord = await getWords(page, level);
    setSavannah({
      ...savannah,
      wordForGame: gameWord,
      allAnswerArray: gameWord.map((i:any) => i.wordTranslate)
    });
  };

  useEffect(() => {
    const userLearnedWord = [];
    if (userLearnedWord.length < 20) {
      let stateMiniGame: any = localStorage.getItem('stateMiniGame');
      if (stateMiniGame) {
        stateMiniGame = JSON.parse(stateMiniGame);
      } else {
        stateMiniGame = {
          savannah: {
            level: 0,
            page: 1
          }

        };
        localStorage.setItem('stateMiniGame', JSON.stringify(stateMiniGame));
      }
      const { level, page } = stateMiniGame.savannah;

      startData(page, level);
    }
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
