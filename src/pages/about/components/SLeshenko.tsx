import React from 'react';

import style from '../about.module.scss';
// Alexandr Leshenko Александр Лещенко SLeshenko
const SLeshenko = () => (
  <div>
    <div className={style['todo-avatar']}>
      <img className={style.avatar} alt="zhenokin" src="https://avatars2.githubusercontent.com/u/37211916?s=400&v=4" />
    </div>
    <div className={style['todo-data']}>
      <div className={style['todo-name']}>
        <span className={style.name}>Александр Лещенко</span>
        <span className={style.role}>Developer</span>
      </div>
      <div className={style.todo}>
        ...data...
      </div>
      <div className={style.github}>
        Github:
        <a href="https://github.com/SLeshenko" style={{ textDecoration: 'none' }}> SLeshenko</a>
      </div>
    </div>
  </div>
);

export default SLeshenko;
