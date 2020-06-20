import React, { useState, useContext } from 'react';
import style from './form.module.scss';
import { logInUser, createUser } from '../../../backend/user';
import { StateContext } from '../../../store/stateProvider';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('input your email and password');

  const { dispatch } = useContext(StateContext);

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
        setMessage("You're in system");
        dispatch({ type: 'SET_AUTH', value: true });
        dispatch({ type: 'SET_TOKEN', value: userAuthInfo.token });
        dispatch({ type: 'USER_ID', value: userAuthInfo.userId });
        break;
      case 'create':
        userAuthInfo = await createUser(user);
        if (!userAuthInfo.ok) {
          setMessage(userAuthInfo.error);
          return;
        }
        setMessage("You're in system");
        dispatch({ type: 'SET_AUTH', value: true });
        dispatch({ type: 'USER_ID', value: userAuthInfo.userId });
        break;
      default:
        break;
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
