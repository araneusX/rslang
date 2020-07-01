import React, { useContext } from 'react';
import StartPage from './components/start-page';
import MainPage from './components/main-page';
import { PuzzleContextProvider, PuzzleContext } from './context';
import Results from './components/results-page';

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
  <PuzzleContextProvider>
    <PuzzleStart />
  </PuzzleContextProvider>
);

export default Puzzle;
