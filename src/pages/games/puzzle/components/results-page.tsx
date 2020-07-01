import React, { useContext } from 'react';
import { PuzzleContext } from '../context';

const Results = () => {
  const { state, dispatch } = useContext(PuzzleContext);
  const { data } = state;
  console.log('state:', state);

  function handleContinue() {
    dispatch({ type: 'set level', value: data.nextLevel });
    dispatch({ type: 'set page', value: data.nextPage });
    dispatch({ type: 'set data', value: null });
    dispatch({ type: 'set mode', value: 'image and words' });
  }

  return (
    <div className="results-page">
      <div className="wrapper-results">
        <div className="wrapper-results-image">
          <img
            className="result-image"
            src={`https://raw.githubusercontent.com/mrINEX/english-puzzle/english-puzzle/english-puzzle/src/assets/data_paintings/${data.pageImage.imageSrc}`}
            style={{ width: 300 }}
            alt="results"
          />
          <h4 style={{ color: 'darkslategray' }}>{data.pageImage.author}</h4>
          <h4 style={{ color: 'darkslategray' }}>{`${data.pageImage.name}(${data.pageImage.year})`}</h4>
        </div>
        <div className="wrapper-results-sentences">
          <div className="result-know">{}</div>
          <div className="result-dont-know">{}</div>
        </div>
        <div className="wrapper-results-button" style={{ display: 'flex' }}>
          <button type="button" onClick={handleContinue} className="btn game-round-btn">Continue</button>
          <button type="button" className="btn game-round-btn">Statistic</button>
        </div>
      </div>
    </div>
  );
};

export default Results;
