import React, { useContext, useRef, useState } from 'react';
import { SentenceNode } from '../ts/Game';
import { PuzzleContext } from '../context';
import Preloader from '../../../../commonComponents/preloader/preloader';

const ImgAndWords = (props: any) => {
  const { dispatch } = useContext(PuzzleContext);
  const gameDOM = useRef<any>(null);

  const { data } = props;
  if (!data) {
    return <Preloader />;
  }

  function handleOnload() {
    dispatch({ type: 'set mode', value: 'assembled-puzzle' });
    dispatch({ type: 'set gameDOM', value: gameDOM });
  }

  const sent: any = [];
  data.sentences.forEach((sentence: SentenceNode, index: number) => {
    sent.push(
      <div className={`sentence-game sentence-${index}`} key={sentence.sentenceText}>
        {
          sentence.words.map((word: string, indx: number) => (
            <div
              className="word-game"
              data-key-word={word}
              data-key-sentence={index}
              key={`${index.toString()}${word}${indx.toString()}`}
            >
              {word}
            </div>
          ))
        }
      </div>
    );
  });
  const startGame: any = React.createElement(React.Fragment, null, React.createElement('div', {
    className: 'wrapper-sentences-game opacity-clear-zero'
  }, sent), React.createElement('img', {
    alt: 'galery',
    onLoad: handleOnload,
    className: 'image-sentences-game',
    src: `https://raw.githubusercontent.com/mrINEX/english-puzzle/english-puzzle/english-puzzle/src/assets/data_paintings/${data.pageImage.imageSrc}`
  }));

  return <div className="wrapper-game" ref={gameDOM}>{startGame}</div>;
};

export default ImgAndWords;
