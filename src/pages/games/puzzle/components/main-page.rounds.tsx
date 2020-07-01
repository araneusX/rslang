import React, { useState, useEffect, useContext } from 'react';
import { isDisabledText, isDisabledAudio } from '../ts/isDisabled';
import { PuzzleContext } from '../context';

function GameRounds(props: any) {
  const { dispatch } = useContext(PuzzleContext);
  const { data } = props;
  const { childrenPuzzle } = props;
  const { gameY } = props;
  const { height } = props;
  const { assembledDOM } = props;

  const [sentenceNumber, setSentenceNumber] = useState(0);

  const { puzzleChld, removePuzzleClds } = childrenPuzzle[sentenceNumber];

  const [visibleDontKnow, setVisibleDontKnow] = useState(true);
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

    const rounds = document.querySelector('.game-round-words');
    Array.from(assembledDOM.current.children[sentenceNumber].children)
      .forEach((el: any, index: number) => {
        if (el.children.length && rounds) {
          rounds.append(el.children[0]);
        }
        el.textContent = data.sentences[sentenceNumber].words[index];
      });
    removePuzzleClds();

    setVisibleDontKnow(!visibleDontKnow);
    setVisibleContinue(!visibleContinue);
  }

  function handleContinueButton() {
    if (sentenceNumber < 9) {
      setSentenceNumber(sentenceNumber + 1);
      setVisibleDontKnow(!visibleDontKnow);
      setVisibleContinue(!visibleContinue);
    } else if (sentenceNumber === 9) {
      dispatch({ type: 'set mode', value: 'image' });
      // const currentGame = this.statisticsСollection();
      // storage(currentGame.innerHTML);
    }
  }

  const dontKnowButton = React.createElement('button', {
    className: 'btn game-round-btn dont-know-botton',
    onClick: handleDontKnowButton,
    type: 'button'
  }, "I don't know");
  const continueButton = React.createElement('button', {
    className: 'btn game-round-btn continue-botton',
    onClick: handleContinueButton,
    type: 'button'
  }, 'Continue');

  const gameRoundControls = React.createElement('div', {
    className: 'game-round-controls'
  }, visibleDontKnow && dontKnowButton,
  visibleContinue && continueButton);

  if (sentenceNumber === 0) { window.scrollTo({ top: 0 }); }

  const GameRoundWords = React.createElement('div', {
    className: 'game-round-words',
    onMouseLeave: () => {
      const rounds = document.querySelector('.game-round-words');
      let countCorrectSentence = 0;
      if (!rounds?.children.length && visibleDontKnow) {
        Array.from(assembledDOM.current.children[sentenceNumber].children)
          .forEach((el: any, index: number) => {
            if (el.children.length && rounds) {
              const keyNest = el.getAttribute('data-key-word');
              const keyPuzzle = el.children[0].getAttribute('data-key-word');
              el.classList.remove('correct-word', 'incorrect-word');
              el.children[0].classList.remove('correct-word', 'incorrect-word');
              if (keyNest === keyPuzzle) {
                countCorrectSentence += 1;
                el.classList.add('correct-word');
                el.children[0].classList.add('correct-word');
              } else {
                el.classList.add('incorrect-word');
                el.children[0].classList.add('incorrect-word');
              }
              el.children[0].classList.remove('absolute');
              rounds.append(el.children[0]);
            }
            el.textContent = data.sentences[sentenceNumber].words[index];
          });
        removePuzzleClds();
        const isNext = countCorrectSentence === assembledDOM.current.children[sentenceNumber].children.length;
        if (isNext) {
          data.sentences[sentenceNumber].audio.play();
          assembledDOM.current.children[sentenceNumber].setAttribute('data-is-correct', `${isNext}`);
          setVisibleDontKnow(!visibleDontKnow);
          setVisibleContinue(!visibleContinue);
        }
      }
    }
  }, puzzleChld.sort(() => Math.random() - 0.5));

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
