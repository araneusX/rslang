import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../../../store/stateProvider';

const StartGameTimer = () => {
  const [seconds, setSeconds] = useState(3);
  const { dispatch } = useContext(StateContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        dispatch({ type: 'SET_SPRINT_SCREEN', value: 'main' });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, dispatch]);

  return (
    <div>
      seconds to start game:
      {seconds}
    </div>
  );
};

export default StartGameTimer;
