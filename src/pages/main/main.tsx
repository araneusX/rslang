import React from 'react';
import { Link } from 'react-router-dom';

import style from './main.module.scss';

const Main = () => (
  <>
    <nav>
      <Link to="/authorization"> Authorization Page </Link>
      <Link to="/main"> Main Page </Link>
      <Link to="/settings"> Settings Page </Link>
    </nav>
    <div>
      Main Page
    </div>
  </>
);

export default Main;
