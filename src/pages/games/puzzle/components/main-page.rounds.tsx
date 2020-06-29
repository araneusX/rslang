import React, { useState, useContext } from 'react';
import { isDisabledText, isDisabledAudio } from '../ts/isDisabled';
import { PuzzleContext } from '../context';

function GameRounds(props: any) {
  // const { state, dispatch } = useContext(PuzzleContext);
  const { data } = props;
  const { childrenPuzzle } = props;
  let { gameY } = props;
  const { height } = props;

  const [sentenceNumber, setSentenceNumber] = useState(0);

  const assembledGamePuzzleDOM = document.querySelector('.wrapper-assembled-game-puzzle')?.children;
  if (assembledGamePuzzleDOM) {
    Array.from(assembledGamePuzzleDOM).forEach((sentence) => {
      sentence.classList.remove('opacity-full', 'event-none-opacity-full');
    });
  }

  const classAudio = isDisabledAudio();
  const pronunciationAudio = React.createElement('div', {
    className: classAudio,
    title: 'pronunciation audio',
    onClick: () => { data.sentences[sentenceNumber].audio.play(); }
  });

  const classText = isDisabledText();
  const pronunciationText = React.createElement('div', {
    className: classText,
    title: 'pronunciation text'
  }, data.sentences[sentenceNumber].textExampleTranslate);

  const wrapperAutoPronunciation = React.createElement('div', {
    className: 'wrapper-auto-pronunciation'
  }, pronunciationAudio, pronunciationText);

  const dontKnowButton = React.createElement('button', {
    className: 'btn game-round-btn dont-know-botton',
    type: 'button'
  }, "I don't know");
  const checkButton = React.createElement('button', {
    className: 'btn game-round-btn check-botton',
    type: 'button'
  }, 'Check');
  const continueButton = React.createElement('button', {
    className: 'btn game-round-btn continue-botton',
    type: 'button'
  }, 'Continue');
  const resultsButton = React.createElement('button', {
    className: 'btn game-round-btn results-botton',
    type: 'button'
  }, 'Results');
  const gameRoundControls = React.createElement('div', {
    className: 'game-round-controls'
  }, dontKnowButton, checkButton, continueButton, resultsButton);

  if (assembledGamePuzzleDOM) {
    assembledGamePuzzleDOM[sentenceNumber].classList.add('opacity-full');
  }
  if (sentenceNumber === 0) { window.scrollTo({ top: 0 }); }

  if (sentenceNumber !== 0) {
    gameY += height;
  }

  const { puzzleChld } = childrenPuzzle[sentenceNumber];
  function roundSentence(puzzle: any[]) {
    const roundWords: any = [];
    puzzle.forEach((word: any) => {
      roundWords.push(React.createElement(
        word.el, word.property, word.word
      ));
    });
    return roundWords;
  }

  const GameRoundWords = React.createElement('div', {
    className: 'game-round-words'
  }, roundSentence(puzzleChld).sort(() => Math.random() - 0.5));

  const wrapperGameRound = React.createElement('div', {
    className: 'wrapper-game-round',
    style: {
      top: `${gameY}px`
    }
  }, GameRoundWords, gameRoundControls);

  return (
    <>
      { wrapperAutoPronunciation }
      { wrapperGameRound }
    </>
  );
}

export default GameRounds;
