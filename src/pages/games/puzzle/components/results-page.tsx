import React, { useContext } from 'react';
import { PuzzleContext } from '../context';

const Results = () => {
  const { state, dispatch } = useContext(PuzzleContext);
  const { data } = state;

  function handleContinue() {
    dispatch({ type: 'set level', value: data.nextLevel });
    dispatch({ type: 'set page', value: data.nextPage });
    dispatch({ type: 'set data', value: null });
    dispatch({ type: 'set mode', value: 'image and words' });
  }

  const continueButton = React.createElement('button', {
    className: 'btn game-round-btn continue-botton',
    onClick: handleContinue,
    type: 'button'
  }, 'Continue');
  const resultsButton = React.createElement('button', {
    className: 'btn game-round-btn results-botton',
    type: 'button'
  }, 'Statistics');

  const gameRoundControls = React.createElement('div', {
    className: 'wrapper-game-round'
  }, continueButton, resultsButton);

  return (
    <div className="wrapper-game">
      {gameRoundControls}
    </div>
  );
};

export default Results;
