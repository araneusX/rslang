import React, { useContext } from 'react';
import { PuzzleContext } from '../context';
import Preloader from '../../../../commonComponents/preloader/preloader';

const Img = () => {
  const { state, dispatch } = useContext(PuzzleContext);
  const { data } = state;
  if (!data) {
    return <Preloader />;
  }

  function handleContinue() {
    dispatch({ type: 'set level', value: data.nextLevel });
    dispatch({ type: 'set page', value: data.nextPage });
    dispatch({ type: 'set data', value: null });
    dispatch({ type: 'set mode', value: 'image and words' });
  }

  function handleResults() {
    dispatch({ type: 'set screen', value: 'results-page' });
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
  }, 'Продолжить');
  const resultsButton = React.createElement('button', {
    className: 'btn game-round-btn results-botton',
    onClick: handleResults,
    type: 'button'
  }, 'Результаты');

  const gameRoundControls = React.createElement('div', {
    className: 'round-controls'
  }, continueButton, resultsButton);
  return (
    <>
      <div className="wrapper-game">
        {img}
        <div className="picture-description">
          <p>{data.pageImage.name}</p>
          <p
            style={{ textTransform: 'capitalize' }}
          >
            {data.pageImage.author.split(', ').reverse().join(' ').toLowerCase()}
          </p>
          <p>{data.pageImage.year}</p>
        </div>
      </div>
      {gameRoundControls}
    </>
  );
};

export default Img;
