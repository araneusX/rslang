import React from 'react';

import style from './headerButtons.module.scss';
import headerLinkButton from '../headerLinkButton/headerLinkButton';

const namesOfButtons: Array<string> = ['Learn', 'Mini-Games', 'Statistics', 'Settings'];

function headerButtons() {
  return (
    <div className={`${style.headerButtons}`}>
      {namesOfButtons.map((el) => headerLinkButton(el))}
    </div>
  );
}

export default headerButtons;
