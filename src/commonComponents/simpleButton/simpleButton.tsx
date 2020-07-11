import React from 'react';

import style from './simpleButton.module.scss';

type ButtonPropsType = {
  text: string,
  clickHandler: () => any,
  size?: 's1' | 's2' | 's3'
};

const SimpleButton: React.FC<ButtonPropsType> = ({ text, clickHandler, size }: ButtonPropsType) => (
  <button
    className={`${style.button} ${size ? style[size] : ''}`}
    type="button"
    onClick={clickHandler}
  >
    {text}
  </button>
);

export default SimpleButton;
