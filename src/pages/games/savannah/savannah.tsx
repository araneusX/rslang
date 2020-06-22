import React from 'react';
import style from './savannah.module.scss';

const Savannah = () => (
  <>
    <div className={`${style.mainContainer}`}>
      <div>
        <div>
          sound: on
          <button type="button">Off sound</button>
        </div>
        <div>
          life: 5
        </div>
      </div>
      <div className={`${style.wordWrapper}`} style={{ top: '5%' }}>
        WORD
      </div>
      <div>
        ANSWERS
      </div>
    </div>
  </>
);

export default Savannah;
