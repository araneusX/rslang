import React from 'react';
import style from '../savannah.module.scss';
import { StartSavannah } from '../helpers/types';

interface Props {
  savannah: StartSavannah,
  setSavannah: any
}

const StartGamePage = (props:Props) => (
  <div className={style.startButtonWrapper}>
    <div className={style.startButtonWrapperBtnBlock}>
      <h2>Savannah</h2>
      <div className={style.startButtonWrapperText}>
        Savannah’s training develops a vocabulary. The more words you know, the more experience you get.
      </div>
      <button type="button" onClick={() => { props.setSavannah({ ...props.savannah, startGame: true }); }}>Start</button>
    </div>
  </div>
);

export default StartGamePage;
