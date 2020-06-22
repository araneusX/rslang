import React, { useEffect, useState, useCallback } from 'react';
import style from '../savannah.module.scss';

interface Props {
  savannah: {[key:string]: any},
  setSavannah: any
}

const Game = (props:Props) => {
  const [secondsToAnswer, setSecondsToAnswer] = useState(300);
  const [endGame, setEndGame] = useState(false);
  const { savannah } = props;

  const lifeDecriment = useCallback(() => {
    props.setSavannah({ ...savannah, life: savannah.life - 1 });
  }, [savannah, props]);

  const checkStatusGame = useCallback(() => {
    if (savannah.life === 1) {
      setSecondsToAnswer(0);
      setEndGame(true);
    } else {
      lifeDecriment();
      setSecondsToAnswer(300);
    }
  }, [savannah.life, lifeDecriment]);

  useEffect(() => {
    let interval: any = null;
    if (secondsToAnswer && !endGame) {
      interval = setInterval(() => {
        setSecondsToAnswer(secondsToAnswer - 1);
      }, 10);
    } else if (secondsToAnswer === 0 && !endGame) {
      checkStatusGame();
    }
    return () => clearInterval(interval);
  }, [secondsToAnswer, endGame, checkStatusGame, lifeDecriment]);

  return (
    <>
      <div>
        secondsToAnswer:
        {secondsToAnswer}
      </div>
      <div className={`${style.mainContainer}`}>
        <div>
          <div>
            sound: on
            <button type="button">Off sound</button>
          </div>
          <div>
            life:
            { savannah.life }
          </div>
        </div>
        <div className={`${style.wordWrapper}`} style={{ top: `${(300 - secondsToAnswer)}px` }}>
          WORD
        </div>
        <div>
          ANSWERS
        </div>
      </div>
    </>
  );
};
export default Game;
