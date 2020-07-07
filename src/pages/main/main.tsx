import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import style from './main.module.scss';
import Card from './components/card';
import cardObj from '../../mosk/testCardObj';
import Preloader from '../../commonComponents/preloader/Preloader';
import { StateContext } from '../../store/stateProvider';

const Main = () => {
  const { state, dispatch } = useContext(StateContext);
  const {
    imageToCard,
    pronounseToCard,
    transcriptionToCard,
    translateToTheCard,
    exampleToCard,
    explainToCard
  } = state.settings.optional;

  const { isLoading } = state.preloader;

  const settings = {
    imageToCard,
    pronounseToCard,
    transcriptionToCard,
    translateToTheCard,
    exampleToCard,
    explainToCard
  };
  /*  dispatch({ type: 'SET_LOADING', value: true }); */

  const dispatchLoading = () => {
    dispatch({ type: 'SET_LOADING', value: false });
  };
  setInterval(dispatchLoading, 1500);

  return (
    <>
      {isLoading ? <Preloader /> : null}
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
