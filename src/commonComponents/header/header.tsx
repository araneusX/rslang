import React, { useContext } from 'react';
import HeaderButton from './components/headerButton';

import style from './header.module.scss';
import { StateContext } from '../../store/stateProvider';
import { AuthInterface } from '../../types';

const namesOfButtons: [string, string][] = [
  // ['Authorization', '/authorization'],
  ['Обучение', '/main'],
  ['Мини-игры', '/games'],
  ['Настройки', '/settings'],
  ['Статистика', '/statistics']
];

const Header:React.ComponentType = () => {
  const { dispatch } = useContext(StateContext);
  const auth: AuthInterface = {
    isAuth: false,
    token: '',
    userId: ''
  };
  function handleLogOut() {
    dispatch({ type: 'SET_AUTH', value: auth });
  }

  return (
    <div className={`${style.header}`}>
      <div className={style['header-logo']}>
        <div className={style['logo-rslang']} />
        <span className={style.rs}>RS</span>
        <span className={style.lang}>Lang</span>
      </div>
      <div className={style['header-links']}>
        {
        namesOfButtons.map((el, i) => (
          <HeaderButton
            title={el[0]}
            link={el[1]}
            key={`${i.toString()}header`}
          />
        ))
      }
      </div>
      <button type="button" onClick={handleLogOut} className={style['log-out']}>
        Выход
        <div className={style['logout-image']} />
      </button>
    </div>
  );
};

export default Header;
