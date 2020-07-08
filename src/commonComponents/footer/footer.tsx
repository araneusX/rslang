import React from 'react';

import { NavLink } from 'react-router-dom';
import style from './footer.module.scss';

const Footer:React.ComponentType = () => (
  <div className={style.footer}>
    <NavLink to="/about" activeStyle={{ color: '#FF9900' }} className={style['link-button']}>
      About team
    </NavLink>
  </div>
);

export default Footer;
