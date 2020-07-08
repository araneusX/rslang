import React from 'react';

import { Link } from 'react-router-dom';

import style from './headerButton.module.scss';

export interface HeaderButtonProps {
  title: string,
  link: string,
  current: boolean
}

const HeaderButton = ({ title, link, current }: HeaderButtonProps) => (
  <Link to={link} className={`${style['link-button']} ${current ? style.current : ''}`}>
    { title }
  </Link>
);
export default HeaderButton;
