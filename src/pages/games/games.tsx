import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import style from './games.module.scss';

const Games = () => (
  <>
    <nav className={style.tiles}>
      <Link to="/games/puzzle">
        <div className={style.tile}>Puzzle</div>
      </Link>
    </nav>
  </>
);
export default Games;
