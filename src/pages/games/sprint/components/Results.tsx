import React, { useContext, useEffect } from 'react';

import style from '../sprint.module.scss';
import { StateContext } from '../../../../store/stateProvider';

const Results = () => {
  const { state, dispatch } = useContext(StateContext);

  return (
    <div className={style.page}>
      Start game
    </div>
  );
};

export default Results;
