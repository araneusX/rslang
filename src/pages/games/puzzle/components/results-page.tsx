import React, { useContext, useState } from 'react';
import { PuzzleContext } from '../context';

const Results = () => {
  const { state, dispatch } = useContext(PuzzleContext);
  const { data, knowledge } = state;

  const [isResult, setIsResult] = useState(true);

  function handleContinue() {
    dispatch({ type: 'set level', value: data.nextLevel });
    dispatch({ type: 'set page', value: data.nextPage });
    dispatch({ type: 'set data', value: null });
    dispatch({ type: 'set screen', value: 'main-page' });
    dispatch({ type: 'set mode', value: 'image and words' });
  }

  const games = window.localStorage.getItem('rslang-statistics');
  let statistics;
  if (games) {
    statistics = JSON.parse(games);
  }

  if (isResult) {
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
            <div className="result-know">
              <h2
                style={
                {
                  color: 'white',
                  background: '#98d33c',
                  borderRadius: '6px',
                  marginBottom: '5px'
                }
              }
              >
                {`I know ${knowledge.know.length}`}
              </h2>
              {knowledge.know.map((item: any, index: number) => (
                <div key={index.toString()} className="wrapper-result">
                  <button type="button" aria-label="audio" className="result-audio" onClick={() => { item.audio.play(); }} />
                  <div className="result-sentence">{item.sentence}</div>
                </div>
              ))}
            </div>
            <div className="result-dont-know">
              <h2
                style={
                {
                  color: 'white',
                  background: '#bd3737',
                  borderRadius: '6px',
                  marginBottom: '5px'
                }
              }
              >
                {`I don't know ${knowledge.dontknow.length}`}
              </h2>
              {knowledge.dontknow.map((item: any, index: number) => (
                <div key={index.toString()} className="wrapper-result">
                  <button type="button" aria-label="audio" className="result-audio" onClick={() => { item.audio.play(); }} />
                  <div className="result-sentence">{item.sentence}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="wrapper-results-button">
            <button type="button" onClick={handleContinue} className="btn game-round-btn">Продолжить</button>
            <button type="button" onClick={() => { setIsResult(false); }} className="btn game-round-btn">Статистика</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="page-statistics">
      <div className="wrapper-statistics">
        { statistics.map((val: any, index: number) => (
          <div key={index.toString()} className="game-statistics">
            <div className="wrapper-results-image">
              <img
                className="result-image"
                src={val.srcimage}
                style={{ width: 300 }}
                alt="results"
              />
              <h4 style={{ color: 'darkslategray' }}>{val.author}</h4>
              <h4 style={{ color: 'darkslategray' }}>{val.nameyear}</h4>
            </div>
            <div className="date-statistics">{val.time}</div>
            <div className="levelAndPage">{val.levelandpage}</div>
            <div>{val.know}</div>
            <div>{val.dontknow}</div>
          </div>
        )) }
      </div>
      <button type="button" onClick={() => { setIsResult(true); }} className="btn game-round-btn">Закрыть</button>
    </div>
  );
};

export default Results;
