import React from 'react';
import Form from './components/form';

import style from './authorization.module.scss';
import { Link, Redirect, Route } from 'react-router-dom';
import { Promo } from '..';

const Authorization = () => (
  <div>
    <Form />
  </div>
);

export default Authorization;
