import React, {
  useEffect, useState, useCallback, useMemo
} from 'react';
import style from '../savannah.module.scss';
import StatisticGame from './StatisticGame';

interface Props {
  savannah: {[key:string]: any},
  setSavannah: any
}

const Game = (props:Props) => {
  const levelsSelect = [0, 1, 2, 3, 4, 5, 6];
  const { savannah, setSavannah } = props;
  const startSecondsToAnswerValue = 250;
  const gameLength = savannah.wordForGame.length;
  const [secondsToAnswer, setSecondsToAnswer] = useState(startSecondsToAnswerValue);
  const [endGame, setEndGame] = useState(false);
  const [word, setWord] = useState(savannah.wordForGame[0].word);
  const [answer, setAnswer] = useState(savannah.wordForGame[0].wordTranslate);
  const [step, setStep] = useState(0);

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
      props.setSavannah({ ...savannah, correctAnswer: [...savannah.correctAnswer, answer] });
      setSecondsToAnswer(startSecondsToAnswerValue);
    } else {
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
      props.setSavannah({ ...savannah, life: savannah.life - 1 });
    },
    [savannah, props]
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
      <div className={`${style.mainContainer}`}>
        {endGame ? (
          <StatisticGame savannah={savannah} setSavannah={setSavannah} />
        ) : (
          <div>
            <div>
              <div>
                sound: on
                <button type="button">Off sound</button>
              </div>
              <div>
                life:
                { savannah.life }
              </div>
              <div>
                select level:
                <select name="levelSelect" id="levelSelect">
                  {levelsSelect.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
            </div>
            <div className={`${style.wordWrapper}`} style={{ top: `${(300 - secondsToAnswer)}px` }}>
              {word}
            </div>
            <div className={`${style.answerBlock}`}>
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