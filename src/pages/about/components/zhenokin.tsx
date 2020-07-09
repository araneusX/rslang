import React from 'react';

import style from '../about.module.scss';
// Yauheni Vaitkevich
const Zhenokin = () => (
  <div>
    <div className={style['todo-avatar']}>
      <img style={{ width: '100%' }} alt="zhenokin" src="https://avatars3.githubusercontent.com/u/31066503?s=400&u=6401e39f1e8ae60cf2db71d2cae22626ef5ecd72&v=4" />
    </div>
    <div className={style['todo-data']}>
      <div className={style.name}>Евгений Вайткевич</div>
      <div className={style.todo}>
        <p>Mentor</p>
      </div>
      <div className={style.github}>
        Github:
        <a href="https://github.com/zhenokin" style={{ textDecoration: 'none' }}> zhenokin</a>
      </div>
    </div>
  </div>
);

export default Zhenokin;
