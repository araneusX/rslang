import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import style from './main.module.scss';
import Card from './components/card';
import cardObj from '../../mosk/testCardObj';
import { StateContext } from '../../store/stateProvider';

const Main = () => {
  const { state } = useContext(StateContext);
  const {
    imageToCard,
    pronounseToCard,
    transcriptionToCard,
    translateToTheCard,
    exampleToCard,
    explainToCard
  } = state.settings.optional;

  const settings = {
    imageToCard,
    pronounseToCard,
    transcriptionToCard,
    translateToTheCard,
    exampleToCard,
    explainToCard
  };

  return (
    <>
      <nav>
        <Link to="/authorization"> Authorization Page </Link>
        <Link to="/main"> Main Page </Link>
        <Link to="/settings"> Settings Page </Link>
      </nav>
      <Card cardObj={cardObj[1]} settings={settings} />
    </>
  );
};
export default Main;
