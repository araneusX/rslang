import React, { useState, useEffect, useContext } from 'react';
import StartGamePage from './components/StartGamePage';
import SavannahGameWrapper from './components/GameWrapper';
import { StartSavannah, initialSavannah } from './helpers/types';
import { getWords, getManyWordsById } from '../../../backend/words';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../types';
import { Preloader } from '../../../commonComponents';
import style from './savannah.module.scss';

const Savannah = () => {
  const startSavannah: StartSavannah = initialSavannah;

  const [savannah, setSavannah] = useState(startSavannah);
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const [isLoading, setIsLoading] = useState(true);

  const startData = async (page:number, level:number) => {
    const gameWord = await getWords(page, level);
    setSavannah({
      ...savannah,
      selectPage: page,
      wordForGame: gameWord,
      allAnswerArray: gameWord.map((i:any) => i.wordTranslate)
    });
    setIsLoading(false);
  };

  useEffect(() => {
    const userLearnedWord = statistics.getAllWordsId();

    if (userLearnedWord.length < 20 || savannah.setLevel) {
      startData(savannah.page, savannah.level);
    } else {
      getManyWordsById(userLearnedWord.slice(0, 20)).then((res) => {
        setSavannah({
          ...savannah,
          level: 6,
          wordForGame: res.content,
          allAnswerArray: res.content.map((i:any) => i.wordTranslate)
        });
        setIsLoading(false);
      });
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (savannah.repeatGame) {
      setSavannah({
        ...savannah,
        startGame: true,
        repeatGame: false
      });
    }
  }, [savannah]);

  return (
    <div className={style.contentWrapper}>
      {isLoading ? <Preloader /> : null}
      {savannah.startGame
        ? <SavannahGameWrapper savannah={savannah} setSavannah={setSavannah} />
        : <StartGamePage savannah={savannah} setSavannah={setSavannah} />}
    </div>
  );
};

export default Savannah;
