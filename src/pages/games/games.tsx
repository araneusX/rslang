import React from 'react';
import { Link } from 'react-router-dom';
import style from './games.module.scss';

const games = [
  ['Ассоциации', '/games/speakit', 'association.jpg'],
  ['Спринт', '/games/speakit', 'sprint.png'],
  ['Саванна', '/games/speakit', 'savannah.png'],
  ['Аудиовызов', '/games/speakit', 'audioCall.png'],
  ['Puzzle', '/games/speakit', 'puzzle.png'],
  ['Speak It', '/games/speakit', 'speakit.png']
];

const Games = () => (
  <div className={style.wrapper}>
    <nav className={style.tiles}>
      {games.map((game) => (
        <Link to={game[1]} key={game[0]}>
          <div
            style={{ background: `${process.env.PUBLIC_URL}/images/tiles/${game[2]}` }}
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
