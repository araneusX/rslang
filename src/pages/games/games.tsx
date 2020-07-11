import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './games.module.scss';
import { StateContext } from '../../store/stateProvider';

const Games = () => {
  const { dispatch } = useContext(StateContext);

  useEffect(() => {
    dispatch({ type: 'SET_AUDIO_INITIAL' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav className={style.tiles}>
        <Link to="/games/speakit">
          <div className={style.tile}>Speak It</div>
        </Link>
        <Link to="/games/sprint">
          <div className={style.tile}>Sprint</div>
        </Link>
        <Link to="/games/audio-call">
          <div className={style.tile}>Audio Call</div>
        </Link>
      </nav>
    </>
  );
};
export default Games;
