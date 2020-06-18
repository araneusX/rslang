import React from 'react';
import { Link } from 'react-router-dom';

import style from './main.module.scss';
import Card from '../learn/components/card';
import cardObj from '../learn/components/testCardObj'

const Main = () => {
  return (
    <>
      <nav>
        <Link to="/authorization"> Authorization Page </Link>
        <Link to="/main"> Main Page </Link>
        <Link to="/settings"> Settings Page </Link>
      </nav>
      <Card cardObj={cardObj[1]}/>
    </>
  );
};

export default Main;
