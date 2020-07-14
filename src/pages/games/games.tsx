import React from 'react';
import { Link } from 'react-router-dom';
import style from './games.module.scss';

const games = [
  ['Ассоциации', '/games/our-game', 'association.jpg'],
  ['Спринт', '/games/savannah', 'sprint.png'],
  ['Саванна', '/games/sprint', 'savannah.png'],
  ['Аудиовызов', '/games/audio-call', 'audioCall.png'],
  ['Puzzle', '/games/puzzle', 'puzzle.png'],
  ['Speak It', '/games/speakit', 'speakit.png']
];

const Games = () => (
  <div className={style.wrapper}>
    <nav className={style.tiles}>
      {games.map((game) => (
        <Link to={game[1]} key={game[0]}>
          <div
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/tiles/${game[2]})` }}
            className={style.tile}
          >
            {game[0]}
          </div>
        </Link>
      ))}
    </nav>
  </div>
);
export default Games;
