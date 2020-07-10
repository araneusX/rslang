import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import style from './form.module.scss';
import {
  logInUser, createUser, getSettings, setSettings
} from '../../../backend/user';
import { StateContext } from '../../../store/stateProvider';
import { StatisticsContext } from '../../../statistics/statisticsProvider';
import { AuthInterface, SettingsInterface, StatisticsInterface } from '../../../types';
import { initSettingsObject } from '../../../constants';

const Form = () => {
  const history = useHistory();
  const [email, setEmail] = useState('qw@qw.qw');
  const [password, setPassword] = useState('12qw!@QW');
  const [message, setMessage] = useState('Введите e-mail и пароль');

  const { dispatch } = useContext(StateContext);
  const statistics = useContext(StatisticsContext) as StatisticsInterface;

  async function clickHandler(event : React.MouseEvent, typeOfEvent: string) {
    const user = { email, password };
    let userAuthInfo = {
      userId: '',
      token: '',
      ok: false,
      error: ''
    };
    switch (typeOfEvent) {
      case 'log':
        userAuthInfo = await logInUser(user);

        if (!userAuthInfo.ok) {
          setMessage(userAuthInfo.error);
          return;
        }

        break;
      case 'create':
        userAuthInfo = await createUser(user);
        if (!userAuthInfo.ok) {
          setMessage(userAuthInfo.error);
          return;
        }

        userAuthInfo = await logInUser(user);

        if (!userAuthInfo.ok) {
          setMessage(userAuthInfo.error);
          return;
        }
        break;
      default:
        break;
    }

    const auth: AuthInterface = {
      isAuth: true,
      token: userAuthInfo.token,
      userId: userAuthInfo.userId
    };

    const initStatus = await statistics.initUser(auth.userId, auth.token);

    let userSettings: SettingsInterface = initSettingsObject;
    const userSettingsData = await getSettings(auth.userId, auth.token);

    if (userSettingsData.status === 404) {
      await setSettings(auth.userId, auth.token, userSettings);
    }

    if (userSettingsData.ok) {
      userSettings = userSettingsData.content;
    }

    setMessage("You're in system");
    dispatch({ type: 'SET_AUTH', value: auth });
    dispatch({ type: 'SET_SETTINGS', value: userSettings });
    history.push('/main');
  }

  function changeHandler(event: { target: { name: string; value: string; }; }) {
    const { value } = event.target;
    const typeOfInput = event.target.name;
    switch (typeOfInput) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  }

  function submitHandler(event : any) {
    event.preventDefault();
  }

  return (
    <div className={style.logInContainer}>
      <div className={style.description}>
        <h1>Добро пожаловать в RSLang!</h1>
        <span className={style.descriptionText}>
          Rslang - это приложение, которое поможет вам выучить английский быстрее и наиболее интересным способом.
          Вам будет весело и никогда не надоест учиться. Присоединяйтесь к нам!
        </span>
        <button type="button" className={style.learnMore}>Узнать больше</button>
      </div>
      <form className={style.form} onSubmit={submitHandler}>
        <b>Бесплатная регистрация</b>
        <input type="email" name="email" placeholder="Enter your E-mail" value={email} onChange={(changeHandler)} />
        <input type="text" name="password" placeholder="Password" value={password} onChange={changeHandler} />
        <div className="output">{message}</div>
        <div className={style.btnContainer}>
          <button type="submit" value="log" className={style.signInButton} onClick={(event) => clickHandler(event, 'log')}>Вход</button>
          <button type="submit" value="create" className={style.signUpButton} onClick={(event) => clickHandler(event, 'create')}>Регистрация</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
