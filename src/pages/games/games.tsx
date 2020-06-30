import React from 'react';
import { Link } from 'react-router-dom';
import style from './main.module.scss';

const Games = () => (
  <>
    <nav className={style.tiles}>
      <Link to="/games/speakit">
        <div className={style.tile}>Speak It</div>
      </Link>
      <Link to="/games/savannah"> Savvannah </Link>
    </nav>
  </>
);

export default Games;
