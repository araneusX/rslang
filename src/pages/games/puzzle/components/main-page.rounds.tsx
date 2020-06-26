import React, { useState } from 'react';
import { isDisabledText, isDisabledAudio } from '../ts/isDisabled';

function GameRounds(props: any) {
  const { data } = props;
  let gameY = 0;

  const [sentenceNumber, setSentenceNumber] = useState(0);
  console.log('round: ', data);
  // if (assembledGamePuzzleDOM) {
  //   Array.from(assembledGamePuzzleDOM).forEach((sentence) => {
  //     sentence.classList.remove('opacity-full', 'event-none-opacity-full');
  //   });
  // }

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

  // assembledGamePuzzleDOM[sentenceNumber].classList.add('opacity-full');
  if (sentenceNumber === 0) { window.scrollTo({ top: 0 }); }

  const wrapperGame = document.querySelector('.wrapper-game');
  let bounding: DOMRect;
  let game;
  if (wrapperGame) {
    bounding = wrapperGame.getBoundingClientRect();
    game = wrapperGame.children[0].children;
    const boundingRound = game[sentenceNumber].getBoundingClientRect();
    if (sentenceNumber === 0) {
      gameY = Math.abs(boundingRound.bottom + boundingRound.height);
    } else {
      gameY += boundingRound.height;
    }
  }

  const childrenPuzzle: any = [];
  if (game) {
    Array.from(game).forEach((sentence, heightIndex) => {
      const puzzleChld: any = [];
      const sentencePuzzle = { puzzleChld };
      childrenPuzzle.push(sentencePuzzle);
      let widthPuzzle = 0;
      Array.from(sentence.children).forEach((word, index) => {
        const bound = word.getBoundingClientRect();

        let width = Number(bound?.width);
        if (sentence.children.length - 1 > index) {
          width += 10;
        }
        let classPuzzle;
        if (index === 0) {
          classPuzzle = 'assembled-word-game-puzzle first-puzzle';
        }
        if (index > 0 && sentence.children.length - 1 > index) {
          classPuzzle = 'assembled-word-game-puzzle center-puzzle';
        }
        if (sentence.children.length - 1 === index) {
          classPuzzle = 'assembled-word-game-puzzle last-puzzle';
        }
        const property = {
          className: classPuzzle,
          'data-key-word': `${word?.textContent}`,
          'data-key-sentence': `${heightIndex}`,
          key: `property${index.toString()}`,
          style: {
            width: `${width}px`,
            height: `${bound.height}px`,
            background: `url(https://raw.githubusercontent.com/mrINEX/english-puzzle/english-puzzle/english-puzzle/src/assets/data_paintings/${data.pageImage.imageSrc})`,
            backgroundSize: `${bounding.width}px`,
            backgroundPositionX: `-${widthPuzzle}px`,
            backgroundPositionY: `-${bound.height * heightIndex}px`
          }
        };
        widthPuzzle += Number(bound.width);
        const wordPuzzle = { el: 'div', property, word: word.textContent };
        puzzleChld.push(wordPuzzle);
      });
    });
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
