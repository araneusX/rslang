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
import { Preloader } from '../../../commonComponents';

const Form = () => {
  const history = useHistory();
  const [email, setEmail] = useState('qw@qw.qw');
  const [password, setPassword] = useState('12qw!@QW');
  const [message, setMessage] = useState('Введите e-mail и пароль.');
  const [isPreloader, setPreloader] = useState(false);

  const { dispatch } = useContext(StateContext);
  const statistics = useContext(StatisticsContext) as StatisticsInterface;

  async function clickHandler(event : React.MouseEvent, typeOfEvent: string) {
    const user = { email, password };
    let authStatus = true;
    let userAuthInfo = {
      userId: '',
      token: '',
      ok: false,
      error: '',
      refreshToken: ''
    };

    setPreloader(true);

    switch (typeOfEvent) {
      case 'log':
        userAuthInfo = await logInUser(user);

        if (!userAuthInfo.ok) {
          setMessage(userAuthInfo.error);
          authStatus = false;
        }
        break;
      case 'create':
        userAuthInfo = await createUser(user);
        if (!userAuthInfo.ok) {
          setMessage(userAuthInfo.error);
          authStatus = false;
        } else {
          userAuthInfo = await logInUser(user);

          if (!userAuthInfo.ok) {
            setMessage(userAuthInfo.error);
            authStatus = false;
          }
        }

        break;
      default:
        break;
    }

    if (authStatus) {
      const auth: AuthInterface = {
        isAuth: true,
        token: userAuthInfo.token,
        userId: userAuthInfo.userId
      };
      const initStatistics = await statistics.initUser(auth.userId, auth.token);

      if (!initStatistics.ok) {
        authStatus = false;
      }

      let userSettings: SettingsInterface = initSettingsObject;
      const userSettingsData = await getSettings(auth.userId, auth.token);
      let initSettings: any;
      if (userSettingsData.status === 404) {
        initSettings = await setSettings(auth.userId, auth.token, userSettings);
        if (!initSettings.ok) {
          authStatus = false;
        }
      } else if (!userSettingsData.ok) {
        authStatus = false;
      } else {
        userSettings = userSettingsData.content;
      }

      setPreloader(false);
      if (authStatus) {
        localStorage.setItem('userId', userAuthInfo.userId);
        localStorage.setItem('refreshToken', userAuthInfo.refreshToken);

        dispatch({ type: 'SET_AUTH', value: auth });
        dispatch({ type: 'SET_SETTINGS', value: userSettings });

        history.push('/main');
      } else {
        setMessage('Извините, сервер времено недоступен, попробуйте позже...');
      }
    } else {
      setPreloader(false);
    }
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
    <div className={style.wrapper}>
      <form className={style.form} onSubmit={submitHandler}>
        <b>Регистрация</b>
        <input type="email" name="email" placeholder="Enter your E-mail" value={email} onChange={(changeHandler)} />
        <input className={style.password} type="text" name="password" placeholder="Password" value={password} onChange={changeHandler} />
        <div className={style.password_message}>
          {'Пароль должен содержать не менее 8 символов, как минимум одну прописную букву, одну заглавную букву, одну цифру и один спецсимвол из +-_@$!%*?&#.,;:[]{}'}
        </div>
        <div className={style.output}>{message}</div>
        <div className={style.btnContainer}>
          <button type="submit" value="log" className={style.signInButton} onClick={(event) => clickHandler(event, 'log')}>Вход</button>
          <button type="submit" value="create" className={style.signUpButton} onClick={(event) => clickHandler(event, 'create')}>Регистрация</button>
        </div>
      </form>
      {isPreloader && <Preloader />}
    </div>
  );
};

export default Form;
