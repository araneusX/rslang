import React, { useContext, useRef } from 'react';
import { PuzzleContext } from '../context';
import GameRounds from './main-page.rounds';

function AssembledGamePuzzle() {
  const { state } = useContext(PuzzleContext);
  const assembledDOM = useRef(null);
  const { data } = state;
  let gameY;
  let height;

  const wrapperGame = document.querySelector('.wrapper-game');

  let bounding: DOMRect;
  let game;
  if (wrapperGame) {
    bounding = wrapperGame.getBoundingClientRect();
    game = wrapperGame.children[0].children;

    const boundingRound = game[0].getBoundingClientRect();
    gameY = Math.abs(boundingRound.bottom) + boundingRound.height;
    height = boundingRound.height;
  }

  const childrenPuzzle: any = [];
  const childrenAssembledPuzzle: any = [];

  const assembledGamePuzzle = React.createElement('div', {
    ref: assembledDOM,
    className: 'wrapper-assembled-game-puzzle'
  }, childrenAssembledPuzzle);

  if (game) {
    Array.from(game).forEach((sentence, heightIndex) => {
      const puzzleChld: any = [];
      const sentencePuzzle = { puzzleChld };
      childrenPuzzle.push(sentencePuzzle);

      const assembledPuzzleChld: any = [];
      // const assembledSentencePuzzle = React.createElement('div', {
      //   className: `assembled-sentence-game-puzzle opacity-full sentence-${heightIndex}`,
      //   key: `${sentence.children.length}${heightIndex.toString()}`
      // }, assembledPuzzleChld);
      // childrenAssembledPuzzle.push(assembledSentencePuzzle);

      let widthPuzzle = 0;
      Array.from(sentence.children).forEach((word, index) => {
        const bound = word.getBoundingClientRect();

        let width = Number(bound?.width);
        if (sentence.children.length - 1 > index) {
          width += 10;
        }

        let classPuzzleAssempled;
        let classPuzzle;
        if (index === 0) {
          classPuzzle = 'assembled-word-game-puzzle first-puzzle';
          classPuzzleAssempled = 'word-game-puzzle first-puzzle assembled-puzzle';
        }
        if (index > 0 && sentence.children.length - 1 > index) {
          classPuzzle = 'assembled-word-game-puzzle center-puzzle';
          classPuzzleAssempled = 'word-game-puzzle center-puzzle assembled-puzzle';
        }
        if (sentence.children.length - 1 === index) {
          classPuzzle = 'assembled-word-game-puzzle last-puzzle';
          classPuzzleAssempled = 'word-game-puzzle last-puzzle';
        }

        const property = {
          className: classPuzzle,
          'data-key-word': `${word?.textContent}`,
          'data-key-sentence': `${heightIndex}`,
          key: `property${index.toString()}`,
          style: {
            width: `${width}px`,
            height: `${bound?.height}px`,
            background: `url(https://raw.githubusercontent.com/mrINEX/english-puzzle/english-puzzle/english-puzzle/src/assets/data_paintings/${data.pageImage.imageSrc})`,
            backgroundSize: `${bounding?.width}px`,
            backgroundPositionX: `-${widthPuzzle}px`,
            backgroundPositionY: `-${bound.height * heightIndex}px`
          }
        };
        const wordPuzzle = { el: 'div', property, word: word.textContent };

        const propertyAssembled = {
          className: classPuzzleAssempled,
          'data-key-word': `${word?.textContent}`,
          'data-key-sentence': `${heightIndex}`,
          key: `propertyAssembled${index.toString()}`,
          style: {
            width: `${width}px`,
            height: `${bound.height}px`,
            background: `url(https://raw.githubusercontent.com/mrINEX/english-puzzle/english-puzzle/english-puzzle/src/assets/data_paintings/${data.pageImage.imageSrc})`,
            backgroundSize: `${bounding.width}px`,
            backgroundPositionX: `-${widthPuzzle}px`,
            backgroundPositionY: `-${bound.height * heightIndex}px`
          }
        };
        const assembledWordPuzzle = React.createElement('div', propertyAssembled);
        widthPuzzle += Number(bound.width);

        assembledPuzzleChld.push(assembledWordPuzzle);
        puzzleChld.push(wordPuzzle);
      });

      const assembledSentencePuzzle = React.createElement('div', {
        className: `assembled-sentence-game-puzzle sentence-${heightIndex}`, // opacity-full
        key: `${sentence.children.length}${heightIndex.toString()}`
      }, assembledPuzzleChld);
      childrenAssembledPuzzle.push(assembledSentencePuzzle);
    });
  }

  return (
    <>
      <GameRounds
        data={data}
        assembledDOM={assembledDOM}
        childrenPuzzle={childrenPuzzle}
        gameY={gameY}
        height={height}
      />
      <div className="wrapper-game">
        {assembledGamePuzzle}
      </div>
    </>
  );
}

export default AssembledGamePuzzle;
