import React, { useEffect, useState } from 'react';
import Game from './Game';

interface Props {
  savannah: {[key:string]: any},
  setSavannah: any
}

const SavannahGameWrapper = (props:Props) => {
  const [seconds, setSeconds] = useState(3);
  const { savannah, setSavannah } = props;

  useEffect(() => {
    let interval: any = null;
    if (seconds) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <>
      {seconds ? (
        <div>
          seconds to start game:
          {seconds}
        </div>
      ) : (<Game savannah={savannah} setSavannah={setSavannah} />
      )}
    </>
  );
};
export default SavannahGameWrapper;
