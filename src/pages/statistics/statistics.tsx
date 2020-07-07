import React, { useState } from 'react';
import Session from './components/session';
import Full from './components/full';
import Total from './components/total';
import style from './statistics.module.scss';

type PeriodType = 'session' | 'total' | 'full';

const Statistics = () => {
  const [periodType, setPeriodType] = useState<PeriodType>('session');
  const handlePeriodChange = (value: PeriodType) => setPeriodType(value);

  return (
    <div className={style.statsContainer}>
      <div className={style.buttonWrapper}>
        <button
          className={periodType === 'session' ? style.activeTab : style.passiveTab}
          type="button"
          onClick={handlePeriodChange.bind(null, 'session')}
        >
          Session stats
        </button>
        <button
          className={periodType === 'total' ? style.activeTab : style.passiveTab}
          type="button"
          onClick={handlePeriodChange.bind(null, 'total')}
        >
          Total stats
        </button>
        <button
          className={periodType === 'full' ? style.activeTab : style.passiveTab}
          type="button"
          onClick={handlePeriodChange.bind(null, 'full')}
        >
          Full stats
        </button>
      </div>
      { periodType === 'session' && <Session />}
      { periodType === 'total' && <Total /> }
      { periodType === 'full' && <Full /> }
    </div>
  );
};

export default Statistics;
