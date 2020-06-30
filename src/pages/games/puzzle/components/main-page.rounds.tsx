import React, { useState, useEffect } from 'react';
import { isDisabledText, isDisabledAudio } from '../ts/isDisabled';

function GameRounds(props: any) {
  const { data } = props;
  const { childrenPuzzle } = props;
  const { gameY } = props;
  const { height } = props;
  const { assembledDOM } = props;

  const [sentenceNumber, setSentenceNumber] = useState(0);

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

  const [visibleDontKnow, setVisibleDontKnow] = useState(true);
  const [visibleCheck, setVisibleCheck] = useState(false);
  const [visibleContinue, setVisibleContinue] = useState(false);
  const [visibleResults, setVisibleResults] = useState(false);

  useEffect(() => {
    Array.from(assembledDOM.current.children).forEach((sentence: any) => {
      sentence.classList.remove('opacity-full', 'event-none-opacity-full');
    });

    assembledDOM.current.children[sentenceNumber].classList.add('opacity-full');
  });

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

  function handleDontKnowButton() {
    const isDisabled = document.querySelector('.volume-prompt')?.classList.contains('disabled');
    if (!isDisabled) {
      data.sentences[sentenceNumber].audio.play();
    }
    const sentence = assembledDOM.current.children[sentenceNumber];
    sentence.setAttribute('data-is-correct', 'false');
    // sentence.classList.remove('opacity-full');
    // sentence.classList.add('event-none-opacity-full');
    // console.log(sentence.classList);

    Array.from(assembledDOM.current.children[sentenceNumber].children)
      .forEach((el: any, index: number) => {
        el.textContent = data.sentences[sentenceNumber].words[index];
      });

    setVisibleDontKnow(!visibleDontKnow);
    setVisibleContinue(!visibleContinue);
  }

  function handleContinueButton() {
    if (sentenceNumber < 9) {
      setSentenceNumber(sentenceNumber + 1);
      setVisibleDontKnow(!visibleDontKnow);
      setVisibleContinue(!visibleContinue);
    }
  }

  const dontKnowButton = React.createElement('button', {
    className: 'btn game-round-btn dont-know-botton',
    onClick: handleDontKnowButton,
    type: 'button'
  }, "I don't know");
  const checkButton = React.createElement('button', {
    className: 'btn game-round-btn check-botton',
    type: 'button'
  }, 'Check');
  const continueButton = React.createElement('button', {
    className: 'btn game-round-btn continue-botton',
    onClick: handleContinueButton,
    type: 'button'
  }, 'Continue');
  const resultsButton = React.createElement('button', {
    className: 'btn game-round-btn results-botton',
    type: 'button'
  }, 'Results');

  const gameRoundControls = React.createElement('div', {
    className: 'game-round-controls'
  }, visibleDontKnow && dontKnowButton,
  visibleCheck && checkButton,
  visibleContinue && continueButton,
  visibleResults && resultsButton);

  if (sentenceNumber === 0) { window.scrollTo({ top: 0 }); }

  const GameRoundWords = React.createElement('div', {
    className: 'game-round-words'
  }, roundSentence(puzzleChld).sort(() => Math.random() - 0.5));

  const wrapperGameRound = React.createElement('div', {
    className: 'wrapper-game-round',
    style: {
      top: `${gameY + (height * sentenceNumber)}px`
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
