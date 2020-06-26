import React, { useState } from 'react';
import { SentenceNode } from '../ts/Game';

const ImgAndWords = (props: any) => {
  const { data, handleOnload } = props;

  console.log('img and words:', props);
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
    className: 'wrapper-sentences-game'
  }, sent), React.createElement('img', {
    alt: 'galery',
    onLoad: handleOnload,
    className: 'image-sentences-game',
    src: `https://raw.githubusercontent.com/mrINEX/english-puzzle/english-puzzle/english-puzzle/src/assets/data_paintings/${data.pageImage.imageSrc}`
  }));

  return startGame;
};

export default ImgAndWords;
