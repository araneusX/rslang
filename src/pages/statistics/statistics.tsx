import React, { useState } from 'react';
import Session from './components/session';
import Full from './components/full';
import style from './statistics.module.scss';

const Statistics = () => {
  const [isSession, setToggled] = useState(true);
  const toggleTrueFalse = (value: boolean) => setToggled(value);

  return (
    <div className={style.statsContainer}>
      <div className={style.buttonWrapper}>
        <button
          className={isSession ? style.activeTab : style.passiveTab}
          type="button"
          onClick={() => toggleTrueFalse(true)}
        >
          Session stats
        </button>
        <button
          className={isSession ? style.passiveTab : style.activeTab}
          type="button"
          onClick={() => toggleTrueFalse(false)}
        >
          Total stats
        </button>
      </div>
      { isSession ? <Session /> : <Full /> }
    </div>
  );
};

export default Statistics;
