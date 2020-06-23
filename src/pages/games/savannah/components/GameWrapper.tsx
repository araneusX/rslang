import React, { useEffect, useState } from 'react';
import Game from './Game';

interface Props {
  savannah: {[key:string]: any},
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
        <div>
          seconds to start game:
          {secondsToStartGame}
        </div>
      ) : (<Game savannah={savannah} setSavannah={setSavannah} />
      )}
    </>
  );
};
export default SavannahGameWrapper;
