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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('input your email and password');

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
        break;
      default:
        break;
    }

    const auth: AuthInterface = {
      isAuth: true,
      token: userAuthInfo.token,
      userId: userAuthInfo.userId
    };

    await statistics.initUser(auth.userId, auth.token);

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
    <form className={style.form} onSubmit={submitHandler}>
      <input type="email" name="email" placeholder="Enter your E-mail" value={email} onChange={(changeHandler)} />
      <input type="text" name="password" placeholder="Password" value={password} onChange={changeHandler} />
      <div className="output">{message}</div>
      <button type="submit" value="log" onClick={(event) => clickHandler(event, 'log')}>Sign In</button>
      <button type="submit" value="create" onClick={(event) => clickHandler(event, 'create')}>Sign Up</button>
    </form>
  );
};

export default Form;
