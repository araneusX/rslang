import React, { useEffect, useState } from 'react';
import { StartSavannah } from '../helpers/types';
import Game from './Game';
import style from '../savannah.module.scss';

interface Props {
  savannah: StartSavannah,
  setSavannah: any
}

const SavannahGameWrapper = (props:Props) => {
  const [secondsToStartGame, setSeconds] = useState(3);
  const { savannah, setSavannah } = props;

  useEffect(() => {
    let interval: any = null;
    if (secondsToStartGame) {
      interval = setInterval(() => {
        setSeconds(secondsToStartGame - 1);
      }, 1000);
    } else if (secondsToStartGame === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [secondsToStartGame]);

  return (
    <>
      {secondsToStartGame ? (
        <div className={style.startButtonWrapper}>
          <div>
            <h2>
              {secondsToStartGame}
            </h2>
          </div>
        </div>
      ) : (<Game savannah={savannah} setSavannah={setSavannah} />
      )}
    </>
  );
};
export default SavannahGameWrapper;
