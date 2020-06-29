import React, { useContext } from 'react';
import StartPage from './components/start-page';
import MainPage from './components/main-page';
import { PuzzleContextProvider, PuzzleContext } from './context';

const PuzzleStart = () => {
  const { state } = useContext(PuzzleContext);

  return (
    <>
      { state.screen === 'start-page' && <StartPage /> }
      { state.screen === 'main-page' && <MainPage /> }
    </>
  );
};

const Puzzle = () => (
  <PuzzleContextProvider>
    <PuzzleStart />
  </PuzzleContextProvider>
);

export default Puzzle;
