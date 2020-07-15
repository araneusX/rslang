import React from 'react';
import Form from './components/form';

import style from './authorization.module.scss';
import { Link } from 'react-router-dom';

const Authorization = () => (
  <div className={style.authorizationWrapper}>
    <div className={style.logInContainer}>
      <div className={style.description}>
        <h1 className={style.title}>Добро пожаловать в RSLang!</h1>
        <span className={style.descriptionText}>
          Rslang - это приложение, которое поможет вам выучить английский язык быстрее и наиболее интересным способом.
          Вам будет весело и никогда не надоест учиться. Присоединяйтесь к нам!
        </span>
        <Link to="/promo" className={style.learnMore}>Узнать больше</Link>
      </div>
      <Form />
    </div>
  </div>
);

export default Authorization;
