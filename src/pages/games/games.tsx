import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import style from './games.module.scss';

const Games = () => (
  <>
    <nav className={style.tiles}>
      <Link to="/games/speakit">
        <div className={style.tile}>Speak It</div>
      </Link>
      <Link to="/games/puzzle">
        <div className={style.tilePuzzle} />
      </Link>
    </nav>
  </>
);
export default Games;
