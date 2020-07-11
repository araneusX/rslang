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
      <h2>Саванна</h2>
      <div className={style.startButtonWrapperText}>
        Игра саванна развивает словарный запас. Вам предстоит угадывать перевод слова из предложенных вариантов ответов.
        Но поторопись, потому-что время для ответа может закончиться...
      </div>
      <button type="button" onClick={() => { props.setSavannah({ ...props.savannah, startGame: true }); }}>Старт</button>
    </div>
  </div>
);

export default StartGamePage;
