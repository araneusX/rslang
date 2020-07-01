import React, { useContext } from 'react';
import { PuzzleContext } from '../context';

const Img = () => {
  const { state, dispatch } = useContext(PuzzleContext);
  const { data } = state;

  const img = React.createElement('img', {
    alt: 'galery',
    className: 'image-sentences-game',
    src: `https://raw.githubusercontent.com/mrINEX/english-puzzle/english-puzzle/english-puzzle/src/assets/data_paintings/${data.pageImage.imageSrc}`
  });

  return <div className="wrapper-game">{img}</div>;
};

export default Img;
