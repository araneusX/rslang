import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderButton from './components/headerButton';

import style from './header.module.scss';
import { StateContext } from '../../store/stateProvider';
import { AuthInterface } from '../../types';

const namesOfButtons: [string, string][] = [
  // ['Authorization', '/authorization'],
  ['Обучение', '/main'],
  ['Мини-игры', '/games'],
  ['Настройки', '/settings'],
  ['Словарь', '/vocabulary'],
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
    dispatch({ type: 'CLEAR_STATE' });
  }

  const { pathname } = useLocation();

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
            current={pathname === el[1]}
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
