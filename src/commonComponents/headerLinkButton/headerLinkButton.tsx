import React from 'react';

import style from './headerLinkButton.module.scss';

function headerLinkButton(el: string) {
  return (
    <div
      // onClick={() => setState(state === 'Bye!' ? 'Hello!' : 'Bye!')}
      className={`${style.headerLinkButton}`}
    >
      {el}
    </div>
  );
}

export default headerLinkButton;
