import React from 'react';
import style from './stats.module.scss';

const Session = () => (
  <div className={style.session}>
    <img src="" alt="img" />
    <div className={style.stats}>
      <div>Cards complete:</div>
      <div>Right answers:</div>
      <div>Wrong answers:</div>
      <div>Longest streak:</div>
    </div>
  </div>
);

export default Session;
