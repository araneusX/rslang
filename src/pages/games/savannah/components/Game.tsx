import React, {
  useEffect, useState, useCallback, useMemo, useContext
} from 'react';
import style from '../savannah.module.scss';
import StatisticGame from './StatisticGame';
import { initialSavannah, StartSavannah, WordForGame } from '../helpers/types';
import { getManyWordsById, getWords } from '../../../../backend/words';
import { StatisticsContext } from '../../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../../types';

interface Props {
  savannah: StartSavannah,
  setSavannah: (val: object)=>void
}

const Game = (props:Props) => {
  const UserWordLevel = 7;
  const [sound, setSound] = useState(true);

  const lifes = [1, 2, 3, 4, 5];

  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const levelsSelect = [1, 2, 3, 4, 5, 6, 7];
  const pagesSelect = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
  const { savannah, setSavannah } = props;
  const startSecondsToAnswerValue = 250;
  const gameLength = savannah.wordForGame.length;
  const [secondsToAnswer, setSecondsToAnswer] = useState(startSecondsToAnswerValue);
  const [endGame, setEndGame] = useState(false);
  const [word, setWord] = useState(savannah.wordForGame[0].word);
  const [answer, setAnswer] = useState(savannah.wordForGame[0].wordTranslate);
  const [step, setStep] = useState(0);
  const userLearnedWord = statistics.getAllWordsId();

  const [localLevel, setLocalLevel] = useState(savannah.level + 1);
  const [localPage, setLocalPage] = useState(savannah.page);

  const changePage = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { value } : any = e.target;
    setLocalPage(Number(value));
  };

  const changeLevel = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { value } : any = e.target;
    setLocalLevel(Number(value));
  };

  const setLevel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (localLevel === UserWordLevel && userLearnedWord.length >= 20) {
      const nextWordForGame = await getManyWordsById(userLearnedWord.slice(0, 20));
      setSavannah({
        ...initialSavannah,
        level: 6,
        repeatGame: true,
        wordForGame: nextWordForGame.content,
        allAnswerArray: nextWordForGame.content.map((i:WordForGame) => i.wordTranslate)
      });
    } else {
      const level = (localLevel === UserWordLevel) ? 0 : (localLevel - 1);
      const page = localPage;
      const nextWordForGame = await getWords(level, page);

      setSavannah({
        ...initialSavannah,
        level,
        page,
        setLevel: true,
        repeatGame: true,
        wordForGame: nextWordForGame,
        allAnswerArray: nextWordForGame.map((i:WordForGame) => i.wordTranslate)
      });
    }
  };

  const nextWord = useCallback(() => {
    const nextStep = step + 1;
    if (nextStep === gameLength) {
      setEndGame(true);
      setSecondsToAnswer(0);
    } else {
      setWord(savannah.wordForGame[nextStep].word);
      setAnswer(savannah.wordForGame[nextStep].wordTranslate);
    }
    setStep(nextStep);
  }, [step, gameLength, savannah.wordForGame]);

  const clickAnswer = (_answer:string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (answer === _answer) {
      if (sound) {
        const audio = new Audio('/mp3/cor.mp3');
        audio.play();
      }
      props.setSavannah({ ...savannah, correctAnswer: [...savannah.correctAnswer, answer] });
      setSecondsToAnswer(startSecondsToAnswerValue);
    } else {
      if (sound) {
        const audio = new Audio('/mp3/no-otveta.mp3');
        audio.play();
      }
      props.setSavannah({ ...savannah, life: savannah.life - 1, errorAnswerArray: [...savannah.errorAnswerArray, answer] });

      if (savannah.life > 1) {
        setSecondsToAnswer(startSecondsToAnswerValue);
      } else {
        setEndGame(true);
        setSecondsToAnswer(0);
      }
    }
    nextWord();
  };

  const computeAnswerArray = useCallback(
    (_word:string, _answer: string) => {
      let arr = [...savannah.allAnswerArray];
      arr.splice(step, 1);
      arr = arr.sort(() => Math.random() - 0.5);
      let answerArr = [answer, ...arr.splice(0, 3)];
      answerArr = answerArr.sort(() => Math.random() - 0.5);
      return answerArr;
    },
    [answer, savannah.allAnswerArray, step]
  );

  const answerArray = useMemo(() => computeAnswerArray(word, answer), [word, answer, computeAnswerArray]);

  const lifeDecriment = useCallback(
    () => {
      props.setSavannah({ ...savannah, life: savannah.life - 1, errorAnswerArray: [...savannah.errorAnswerArray, answer] });
    },
    [savannah, props, answer]
  );

  const checkStatusGame = useCallback(() => {
    if (savannah.life > 1) {
      setSecondsToAnswer(startSecondsToAnswerValue);
    } else {
      setSecondsToAnswer(0);
      setEndGame(true);
    }
    lifeDecriment();
    nextWord();
  }, [savannah.life, lifeDecriment, nextWord]);

  useEffect(() => {
    let interval: any = null;
    if (secondsToAnswer && !endGame) {
      interval = setInterval(() => {
        setSecondsToAnswer(secondsToAnswer - 1);
      }, 20);
    } else if (secondsToAnswer === 0 && !endGame) {
      checkStatusGame();
    } else if (endGame) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [secondsToAnswer, endGame, checkStatusGame, lifeDecriment]);

  return (
    <>
      <div className={style.heightAuto}>
        {endGame ? (
          <StatisticGame savannah={savannah} setSavannah={setSavannah} />
        ) : (
          <div className={style.gameMainWrapper}>
            <div className={`${style.lineToError}`} style={{ top: `${startSecondsToAnswerValue + 100}px` }} />
            <div className={style.gameMainHead}>
              <div className={style.gameMainLifes}>
                {lifes.map((i) => (i <= savannah.life ? <span key={i} className={style.gameMainLifeOn} />
                  : <span key={i} className={style.gameMainLifeOff} />))}
              </div>
              <div className={style.gameMainLevels}>
                уровень:
                <select name="levelSelect" id="levelSelect" onChange={changeLevel} value={localLevel}>
                  {levelsSelect.map((i) => (
                    <option
                      key={i}
                      value={i}
                      disabled={userLearnedWord.length < 20 && i === UserWordLevel}
                    >
                      { i === UserWordLevel ? 'User word' : i}
                    </option>
                  ))}
                </select>
                стр.:
                <select name="pageSelect" id="pageSelect" onChange={changePage} value={localPage} disabled={localLevel === UserWordLevel}>
                  {pagesSelect.map((i) => (
                    <option
                      key={i}
                      value={i}
                    >
                      {i}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={setLevel}>Выбрать</button>
              </div>
            </div>
            <div className={`${style.wordWrapper}`} style={{ top: `${(300 - secondsToAnswer)}px` }}>
              {word}
            </div>
            <div className={style.answerBlock}>
              {answerArray.map((i) => (
                <div key={i}>
                  <button
                    onClick={(event) => clickAnswer(i, event)}
                    type="button"
                  >
                    {i}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Game;
