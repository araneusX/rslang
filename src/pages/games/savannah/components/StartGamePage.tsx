import React from 'react';
import style from '../savannah.module.scss';
import { StartSavannah } from '../helpers/types';

interface Props {
  savannah: StartSavannah,
  setSavannah: any
}

const StartGamePage = (props:Props) => (
  <>
    <div className={`${style.mainContainer}`}>
      <div>
        <button type="button" onClick={() => { props.setSavannah({ ...props.savannah, startGame: true }); }}>Start game</button>
      </div>
    </div>
  </>
);

export default StartGamePage;
