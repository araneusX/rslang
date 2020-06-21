import React from 'react';
import { Link } from 'react-router-dom';

import style from './main.module.scss';
import Card from './components/card/card';
import cardObj from '../../mosk/testCardObj';
import settingsObj from '../../mosk/testSettingsObj';

const Main = () => (
  <>
    <nav>
      <Link to="/authorization"> Authorization Page </Link>
      <Link to="/main"> Main Page </Link>
      <Link to="/settings"> Settings Page </Link>
    </nav>
    <Card cardObj={cardObj[1]} settingsObj={settingsObj[0]} />
  </>
);

export default Main;
