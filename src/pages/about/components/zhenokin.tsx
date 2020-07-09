import React from 'react';

import style from '../about.module.scss';
// Yauheni Vaitkevich Евгений Вайткевич zhenokin
const Zhenokin = () => (
  <div>
    <div className={style['todo-avatar']}>
      <img className={style.avatar} alt="zhenokin" src="https://avatars3.githubusercontent.com/u/31066503?s=400&u=6401e39f1e8ae60cf2db71d2cae22626ef5ecd72&v=4" />
    </div>
    <div className={style['todo-data']}>
      <div className={style['todo-name']}>
        <span className={style.name}>Евгений Вайткевич</span>
        <span className={style.role}>Mentor</span>
      </div>
      <div className={style.todo}>
        ...data...
      </div>
      <div className={style.github}>
        Github:
        <a href="https://github.com/zhenokin" style={{ textDecoration: 'none' }}> zhenokin</a>
      </div>
    </div>
  </div>
);

export default Zhenokin;
