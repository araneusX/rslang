import React, { useContext, useLayoutEffect } from 'react';
import { PuzzleContext } from '../context';
import userStorage from '../ts/storage.user';

function StartPage() {
  const { dispatch } = useContext(PuzzleContext);
  const { level, page } = userStorage({});

  useLayoutEffect(() => {
    dispatch({ type: 'set level', value: level });
    dispatch({ type: 'set page', value: page });
  }, [level, page]);

  function handleStart() {
    dispatch({ type: 'set screen', value: 'main-page' });
  }

  return (
    <div className="start-page">
      <h1 className="start-page__title">ENGLISH PUZZLE</h1>
      <p className="start-page__text">
        Нажмите на слова, собирайте фразы.
        <br />
        Слова можно перетаскивать. Выбирать всплывающие подсказки в меню.
      </p>
      <button onClick={handleStart} type="button" className="start-page__button btn">
        Начать
      </button>
    </div>
  );
}

export default StartPage;
