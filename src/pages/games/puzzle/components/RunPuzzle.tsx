import React, { useState, useEffect, useRef } from 'react';
import ImgAndWords from './ImgAndWords';
import AssembledGamePuzzle from './AssembledGamePuzzle';

function RunPuzzle(props: any) {
  const { updateData } = props;
  const data = updateData('get');
  const [isload, setIsLoad] = useState(false);

  console.log('run:', props, 'isLoad:', isload);

  function handleOnload() {
    setIsLoad(!isload);
  }
  if (!isload) {
    return <ImgAndWords data={data} handleOnload={handleOnload} />;
  }
  return <AssembledGamePuzzle data={data} />;

  // const prepare = (predata: { sentences: SentenceNode[]; pageImage: { imageSrc: any; }; }) => {
  //   console.log('prepare:');
  //   const sent: any = [];
  //   predata.sentences.forEach((sentence: SentenceNode, index: number) => {
  //     sent.push(
  //       <div className={`sentence-game sentence-${index}`} key={sentence.sentenceText}>
  //         {
  //         sentence.words.map((word: string, indx: number) => (
  //           <div
  //             className="word-game"
  //             data-key-word={word}
  //             data-key-sentence={index}
  //             key={`${index.toString()}${word}${indx.toString()}`}
  //           >
  //             {word}
  //           </div>
  //         ))
  //       }
  //       </div>
  //     );
  //   });
  //   const startGame: any = React.createElement(React.Fragment, null, React.createElement('div', {
  //     className: 'wrapper-sentences-game'
  //   }, sent), React.createElement('img', {
  //     alt: 'galery',
  //     onLoad: handleOnload,
  //     className: 'image-sentences-game',
  //     src: `https://raw.githubusercontent.com/mrINEX/english-puzzle/english-puzzle/english-puzzle/src/assets/data_paintings/${predata.pageImage.imageSrc}`
  //   }));
  //   return startGame;
  // };
  // const [gameData, setGameData] = useState(prepare(data));

  // console.log('pzzle run:', gameData);
  // useEffect(() => {
  //   setGameData(prepare(data));
  // }, [data]);

  // function handleOnload() {
  //   const wrapperGame = document.querySelector('.wrapper-game');
  //   let bounding: DOMRect;
  //   let game;
  //   if (wrapperGame) {
  //     bounding = wrapperGame.getBoundingClientRect();
  //     game = wrapperGame.children[0].children;
  //   }

  //   const childrenPuzzle: any = [];

  //   const childrenAssembledPuzzle: any = [];
  //   const assembledGamePuzzle = React.createElement('div', {
  //     className: 'wrapper-assembled-game-puzzle'
  //   }, childrenAssembledPuzzle);

  //   if (game) {
  //     Array.from(game).forEach((sentence, heightIndex) => {
  //       const puzzleChld: any = [];
  //       const sentencePuzzle = { puzzleChld };
  //       childrenPuzzle.push(sentencePuzzle);

  //       const assembledPuzzleChld: any = [];
  //       const assembledSentencePuzzle = React.createElement('div', {
  //         className: `assembled-sentence-game-puzzle opacity-full sentence-${heightIndex}`,
  //         key: `${sentence.children.length}${heightIndex.toString()}`
  //       }, assembledPuzzleChld);
  //       childrenAssembledPuzzle.push(assembledSentencePuzzle);

  //       let widthPuzzle = 0;
  //       Array.from(sentence.children).forEach((word, index) => {
  //         const bound = word.getBoundingClientRect();

  //         let width = Number(bound?.width);
  //         if (sentence.children.length - 1 > index) {
  //           width += 10;
  //         }

  //         let classPuzzleAssempled;
  //         let classPuzzle;
  //         if (index === 0) {
  //           classPuzzle = 'assembled-word-game-puzzle first-puzzle';
  //           classPuzzleAssempled = 'word-game-puzzle first-puzzle assembled-puzzle';
  //         }
  //         if (index > 0 && sentence.children.length - 1 > index) {
  //           classPuzzle = 'assembled-word-game-puzzle center-puzzle';
  //           classPuzzleAssempled = 'word-game-puzzle center-puzzle assembled-puzzle';
  //         }
  //         if (sentence.children.length - 1 === index) {
  //           classPuzzle = 'assembled-word-game-puzzle last-puzzle';
  //           classPuzzleAssempled = 'word-game-puzzle last-puzzle';
  //         }

  //         const property = {
  //           className: classPuzzle,
  //           'data-key-word': `${word?.textContent}`,
  //           'data-key-sentence': `${heightIndex}`,
  //           key: `property${index.toString()}`,
  //           style: {
  //             width: `${width}px`,
  //             height: `${bound?.height}px`,
  //             background: `url(https://raw.githubusercontent.com/mrINEX/english-puzzle/english-puzzle/english-puzzle/src/assets/data_paintings/${data.pageImage.imageSrc})`,
  //             backgroundSize: `${bounding?.width}px`,
  //             backgroundPositionX: `-${widthPuzzle}px`,
  //             backgroundPositionY: `-${bound.height * heightIndex}px`
  //           }
  //         };
  //         const wordPuzzle = { el: 'div', property, word: word.textContent };

  //         const propertyAssembled = {
  //           className: classPuzzleAssempled,
  //           'data-key-word': `${word?.textContent}`,
  //           'data-key-sentence': `${heightIndex}`,
  //           key: `propertyAssembled${index.toString()}`,
  //           style: {
  //             width: `${width}px`,
  //             height: `${bound.height}px`,
  //             background: `url(https://raw.githubusercontent.com/mrINEX/english-puzzle/english-puzzle/english-puzzle/src/assets/data_paintings/${data.pageImage.imageSrc})`,
  //             backgroundSize: `${bounding.width}px`,
  //             backgroundPositionX: `-${widthPuzzle}px`,
  //             backgroundPositionY: `-${bound.height * heightIndex}px`
  //           }
  //         };
  //         const assembledWordPuzzle = React.createElement('div', propertyAssembled);
  //         widthPuzzle += Number(bound.width);

  //         assembledPuzzleChld.push(assembledWordPuzzle);
  //         puzzleChld.push(wordPuzzle);
  //       });
  //     });
  //   }
  //   setGameData(assembledGamePuzzle);

  //   updateData({
  //     sentences: data.sentences,
  //     pageImage: data.pageImage
  //   });
  // }
  // return gameData;
}

export default RunPuzzle;
