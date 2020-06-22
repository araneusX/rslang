import React from 'react';

import { Link } from 'react-router-dom';

import style from './headerButton.module.scss';

export interface HeaderButtonProps {
  title: string,
  link: string
}

const HeaderButton = ({ title, link }: HeaderButtonProps) => (
  <Link to={link}>
    <div className={`${style.headerLinkButton}`}>
      { title }
    </div>
  </Link>
);
export default HeaderButton;
