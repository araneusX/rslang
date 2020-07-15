import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { StateContext } from '../../store/stateProvider';
import Form from './components/form';
import style from './authorization.module.scss';
import { Preloader } from '../../commonComponents';
import { refreshUser, getSettings, setSettings } from '../../backend/user';
import { StatisticsContext } from '../../statistics/statisticsProvider';
import { AuthInterface, SettingsInterface } from '../../types';
import { initSettingsObject } from '../../constants';

const Authorization = () => {
  const { dispatch } = useContext(StateContext);
  const statistics = useContext(StatisticsContext);
  const [preloader, setPreloader] = useState(true);
  const history = useHistory();

  useEffect(() => {
    let ignore = false;
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');
    const setNewAuthData = async (): Promise<void> => {
      if (refreshToken && userId) {
        const newAuthData = await refreshUser(userId, refreshToken);
        if (!ignore) {
          if (newAuthData.ok) {
            let authStatus = true;

            const auth: AuthInterface = {
              isAuth: true,
              token: newAuthData.token,
              userId
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
            if (authStatus) {
              localStorage.setItem('refreshToken', newAuthData.refreshToken);
              dispatch({ type: 'SET_AUTH', value: auth });
              dispatch({ type: 'SET_SETTINGS', value: userSettings });
              history.push('/main');
            } else if (newAuthData.status === 'wrong') {
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('userId');
            }
          }
        }
      }

      if (!ignore) {
        setPreloader(false);
      }
    };
    setNewAuthData();
    return () => { ignore = true; };
  }, []);

  return (
    <div className={style.authorizationWrapper}>
      {preloader
        ? <Preloader />
        : (
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
        )}
    </div>
  );
};

export default Authorization;
