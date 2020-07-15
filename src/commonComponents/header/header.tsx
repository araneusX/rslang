import React, {
  useContext, useRef, useEffect
} from 'react';
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
  const burgerMenu = useRef(null);
  const burgerMenuList = useRef(null);
  const { dispatch } = useContext(StateContext);
  const auth: AuthInterface = {
    isAuth: false,
    token: '',
    userId: ''
  };

  function handleLogOut() {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');

    dispatch({ type: 'CLEAR_STATE' });
  }

  const openMenu = () => {
    const menu : any = burgerMenu.current;
    const menuList : any = burgerMenuList.current;

    if (menu) {
      menu.classList.toggle('active');
      menuList.classList.toggle('active');
    }
  };

  useEffect(() => {
    const menuList : any = burgerMenuList.current;
    const menu : any = burgerMenu.current;
    if (menuList) {
      menuList.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuList.classList.toggle('active');
      });
    }
  }, []);

  const { pathname } = useLocation();

  return (
    <div className={`${style.header}`}>
      <div className="menu__mobile">
        <div
          role="button"
          tabIndex={0}
          className="menu__mobile_button"
          ref={burgerMenu}
          onClick={() => { openMenu(); }}
          onKeyDown={() => {}}
        >
          <span />
        </div>
      </div>
      <div className={style['header-logo']}>
        <div className={style['logo-rslang']} />
        <span className={style.rs}>RS</span>
        <span className={style.lang}>Lang</span>
      </div>
      <div className={`${style['header-links']} header-links-mobile`} ref={burgerMenuList}>
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
        <span className={style['logout-text']}>Выход</span>
        <div className={style['logout-image']} />
      </button>
    </div>
  );
};

export default Header;
