import React, { useRef, useContext } from 'react';
import GameRounds from './main-page.rounds';
import { pxTOvw } from '../ts/pxTovw';
import { PuzzleContext } from '../context';

function AssembledGamePuzzle(props: any) {
  const assembledDOM = useRef(null);
  const { data } = props;
  const { state } = useContext(PuzzleContext);
  let gameY;
  let height;

  const wrapperGame = state.gameDOM.current;

  let bounding: DOMRect;
  let game;
  if (wrapperGame) {
    bounding = wrapperGame.getBoundingClientRect();
    game = wrapperGame.children[0].children;

    const boundingRound = game[0].getBoundingClientRect();
    gameY = Math.abs(bounding.top) + boundingRound.height;
    height = boundingRound.height;
  }

  const childrenPuzzle: any = [];
  const childrenAssembledPuzzle: any = [];

  const assembledGamePuzzle = React.createElement('div', {
    ref: assembledDOM,
    className: 'wrapper-assembled-game-puzzle'
  }, childrenAssembledPuzzle);

  if (game) {
    Array.from(game).forEach((sentence: any, heightIndex) => {
      const puzzleChld: any = [];

      const assembledPuzzleChld: any = [];

      let widthPuzzle = 0;
      Array.from(sentence.children).forEach((word: any, index) => {
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
          'data-key-word': `${word.textContent}`,
          'data-key-sentence': `${heightIndex}`,
          key: `property${index.toString()}`,
          style: {
            width: `${pxTOvw(width)}vw`,
            height: `${pxTOvw(bound?.height)}vw`,
            background: `url(https://raw.githubusercontent.com/mrINEX/english-puzzle/english-puzzle/english-puzzle/src/assets/data_paintings/${data.pageImage.imageSrc})`,
            backgroundSize: `${pxTOvw(bounding?.width)}vw`,
            backgroundPositionX: `-${pxTOvw(widthPuzzle)}vw`,
            backgroundPositionY: `-${pxTOvw(bound.height * heightIndex)}vw`,
            fontSize: '1.7vw',
            fontWeight: 'bold',
            flex: '1 0 auto'
          }
        };
        const wordPuzzle = React.createElement('div', property, word.textContent);

        const propertyAssembled = {
          className: classPuzzleAssempled,
          'data-key-word': `${word?.textContent}`,
          'data-key-sentence': `${heightIndex}`,
          key: `propertyAssembled${index.toString()}`,
          style: {
            width: `${pxTOvw(width)}vw`,
            height: `${pxTOvw(bound.height)}vw`,
            background: `url(https://raw.githubusercontent.com/mrINEX/english-puzzle/english-puzzle/english-puzzle/src/assets/data_paintings/${data.pageImage.imageSrc})`,
            backgroundSize: `${pxTOvw(bounding.width)}vw`,
            backgroundPositionX: `-${pxTOvw(widthPuzzle)}vw`,
            backgroundPositionY: `-${pxTOvw(bound.height * heightIndex)}vw`,
            fontSize: '1.7vw',
            fontWeight: 'bold',
            flex: '1 0 auto'
          }
        };
        const assembledWordPuzzle = React.createElement('div', propertyAssembled);
        widthPuzzle += Number(bound.width);

        assembledPuzzleChld.push(assembledWordPuzzle);
        puzzleChld.push(wordPuzzle);
      });

      function removePuzzleClds() {
        puzzleChld.length = 0;
      }
      const sentencePuzzle = { puzzleChld, removePuzzleClds };
      childrenPuzzle.push(sentencePuzzle);

      const assembledSentencePuzzle = React.createElement('div', {
        className: `assembled-sentence-game-puzzle sentence-${heightIndex}`,
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
