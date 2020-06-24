import React, { useState } from 'react';
import MainPage from './main-page';

function StartPage() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className="start-page">
        <h1 className="start-page__title">ENGLISH PUZZLE</h1>
        <p className="start-page__text">
          Click on words, collect phrases.
          <br />
          Words can be drag and drop. Select tooltips in the menu.
        </p>
        <button onClick={() => setShow(false)} type="button" className="start-page__button btn">
          Start
        </button>
      </div>
    );
  }
  return <MainPage />;
}

export default StartPage;
