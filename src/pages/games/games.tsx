// import style from './games.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

import style from './main.module.scss';

const Games = () => (
  <>
    <div>
      <Link to="/games/savannah"> Savvannah </Link>
    </div>
  </>
);

export default Games;
