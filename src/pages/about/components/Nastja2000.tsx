import React from 'react';

import style from '../about.module.scss';
//  Zizeko Anastasia Анастасия Зизеко Nastja2000
const Nastja2000 = () => (
  <div>
    <div className={style['todo-avatar']}>
      <img className={style.avatar} alt="zhenokin" src="https://avatars3.githubusercontent.com/u/47385821?s=400&u=5cd06097a0ba0836897efb1b08449084bd9115e9&v=4" />
    </div>
    <div className={style['todo-data']}>
      <div className={style['todo-name']}>
        <span className={style.name}>Анастасия Зизеко</span>
        <span className={style.role}>Developer</span>
      </div>
      <div className={style.todo}>
        ...data...
      </div>
      <div className={style.github}>
        Github:
        <a href="https://github.com/Nastja2000" style={{ textDecoration: 'none' }}> Nastja2000</a>
      </div>
    </div>
  </div>
);

export default Nastja2000;
