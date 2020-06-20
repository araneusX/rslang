import React, { useState, useContext } from 'react';
import style from './form.module.scss';
import { BackendContext } from '../../../backend/backendProvider';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTJhZjlmNmI2ODlhMDAxNzllYWQ2ZSIsImlhdCI6MTU5MjYwNjM4OSwiZXhwIjoxNTkyNjIwNzg5fQ.Tup2h1RbWR4FLZsVJTmQZ1__gp1dYtW7U2JS2iyjQ0o';
const userId = '5ee2af9f6b689a00179ead6e';

const Form = () => {
  const [state, setState] = useState(0);
  const { statistics } = useContext(BackendContext);

  const onIn = async () => {
    const res = await statistics.init(userId, token);
    console.log(res);
  };

  return (
    <form className={style.form}>
      <input type="email" name="email" placeholder="Enter your E-mail" />
      <input type="text" name="password" placeholder="Password" />
      <div className="output">{state}</div>
      <button type="button" onClick={onIn}>Sign In</button>
      <button type="button">Sign Up</button>
    </form>
  );
};

export default Form;
