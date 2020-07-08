import React from 'react';
import style from './preloader.module.scss';

const Preloader = () => (
  <div className={style.wrapper}>
    <img src={`${process.env.PUBLIC_URL}/images/loading.gif`} alt="preloader" />
  </div>
);

export default Preloader;
