import React, { useContext, useEffect } from 'react';

import style from '../sprint.module.scss';
import { StateContext } from '../../../../store/stateProvider';

const Main = () => {
  const { state, dispatch } = useContext(StateContext);

  console.log(state.sprint.words);

  return (
    <div className={style.page}>
      Main game wrapp
    </div>
  );
};

export default Main;
