import React, { useState } from 'react';

import style from './hello.module.scss';

const Hello = () => {
  const [state, setState] = useState('Hello!');
  return (
    <button
      type="button"
      onClick={() => setState(state === 'Bye!' ? 'Hello!' : 'Bye!')}
      className={`${style.button} ${state === 'Bye!' ? style.hello : style.bye}`}
    >
      {state}
    </button>
  );
};

export default Hello;
