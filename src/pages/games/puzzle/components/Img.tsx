import React, { useContext } from 'react';
import { PuzzleContext } from '../context';

const Img = () => {
  const { state, dispatch } = useContext(PuzzleContext);
  const { data } = state;

  function handleContinue() {
    dispatch({ type: 'set level', value: data.nextLevel });
    dispatch({ type: 'set page', value: data.nextPage });
    dispatch({ type: 'set data', value: null });
    dispatch({ type: 'set mode', value: 'image and words' });
  }

  const img = React.createElement('img', {
    alt: 'galery',
    className: 'image-sentences-game',
    src: `https://raw.githubusercontent.com/mrINEX/english-puzzle/english-puzzle/english-puzzle/src/assets/data_paintings/${data.pageImage.imageSrc}`
  });

  const continueButton = React.createElement('button', {
    className: 'btn game-round-btn continue-botton',
    onClick: handleContinue,
    type: 'button'
  }, 'Continue');
  const resultsButton = React.createElement('button', {
    className: 'btn game-round-btn results-botton',
    type: 'button'
  }, 'Results');

  const gameRoundControls = React.createElement('div', {
    className: 'wrapper-game-round'
  }, continueButton, resultsButton);

  return (
    <div className="wrapper-game">
      {gameRoundControls}
      {img}
    </div>
  );
};

export default Img;
