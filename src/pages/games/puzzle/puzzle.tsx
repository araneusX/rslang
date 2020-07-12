import React, { useContext } from 'react';
import StartPage from './components/start-page';
import MainPage from './components/main-page';
import { PuzzleContextProvider, PuzzleContext } from './context';
import Results from './components/results-page';
import './scss/style.scss';

const PuzzleStart = () => {
  const { state } = useContext(PuzzleContext);

  return (
    <>
      { state.screen === 'start-page' && <StartPage /> }
      { state.screen === 'main-page' && <MainPage /> }
      { state.screen === 'results-page' && <Results />}
    </>
  );
};

const Puzzle = () => (
  <div className="base-wrapper">
    <PuzzleContextProvider>
      <PuzzleStart />
    </PuzzleContextProvider>
  </div>
);

export default Puzzle;
