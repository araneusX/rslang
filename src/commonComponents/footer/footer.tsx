import React from 'react';

import { Link } from 'react-router-dom';
import style from './footer.module.scss';

const Footer:React.ComponentType = () => (
  <div className={style.footer}>
    <Link to="/about" className={style['link-button']}>
      About team
    </Link>
  </div>
);

export default Footer;
