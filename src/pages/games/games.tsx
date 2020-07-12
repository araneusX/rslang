import React from 'react';
import { Link } from 'react-router-dom';
import style from './games.module.scss';

const Games = () => (
  <>
    <nav className={style.tiles}>
      <Link to="/games/speakit">
        <div className={style.tile}>Speak It</div>
      </Link>
      <Link to="/games/sprint">
        <div className={style.tile}>Спринт</div>
      </Link>
      <Link to="/games/savannah">
        <div className={style.tile}>Саванна</div>
      </Link>
      <Link to="/games/audio-call">
        <div className={style.tile}>Аудиовызов</div>
      </Link>
      <Link to="/games/puzzle">
        <div className={style.tile}>Пазл</div>
      </Link>
    </nav>
  </>
);
export default Games;
