import React from 'react';
import { Link } from 'react-router-dom';
import style from './games.module.scss';

const Games = () => {

  return (
    <>
      <nav className={style.tiles}>
        <Link to="/games/speakit">
          <div className={style.tile}>Speak It</div>
        </Link>
        <Link to="/games/sprint">
          <div className={style.tile}>Sprint</div>
        </Link>
        <Link to="/games/audio-call">
          <div className={style.tile}>Audio Call</div>
        </Link>
      </nav>
    </>
  );
};
export default Games;
