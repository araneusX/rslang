import React, { useContext } from 'react';
import { PuzzleContext } from '../context';

function StartPage() {
  const { dispatch } = useContext(PuzzleContext);

  function handleStart() {
    console.log(dispatch);
    dispatch({ type: 'screen', value: 'main-page' });
  }

  return (
    <div className="start-page">
      <h1 className="start-page__title">ENGLISH PUZZLE</h1>
      <p className="start-page__text">
        Click on words, collect phrases.
        <br />
        Words can be drag and drop. Select tooltips in the menu.
      </p>
      <button onClick={handleStart} type="button" className="start-page__button btn">
        Start
      </button>
    </div>
  );
}

export default StartPage;
