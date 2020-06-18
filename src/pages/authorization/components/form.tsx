import React, { useState } from 'react';
import style from './form.module.scss';
import { logInUser, createUser } from '../../../backend/user';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function clickHandler(event : any) {
    localStorage.setItem('typeOfEvent', event.target.value);
  }

  function changeHandler(event: { target: { name: any; value: any; }; }) {
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

  async function submitHandler(event : any) {
    event.preventDefault();
    const typeOfEvent = localStorage.getItem('typeOfEvent');
    const user = { email, password };

    switch (typeOfEvent) {
      case 'log':
        console.log(await logInUser(user));
        break;
      case 'create':
        console.log(await createUser(user));
        break;
      default:
        break;
    }
  }

  return (
    <form className={style.form} onSubmit={submitHandler}>
      <input type="email" name="email" placeholder="Enter your E-mail" value={email} onChange={(changeHandler)} />
      <input type="text" name="password" placeholder="Password" value={password} onChange={changeHandler} />
      <div className="output" />
      <button type="submit" value="log" onClick={clickHandler}>Sign In</button>
      <button type="submit" value="create" onClick={clickHandler}>Sign Up</button>
    </form>
  );
};

export default Form;
