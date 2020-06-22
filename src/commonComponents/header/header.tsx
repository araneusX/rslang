import React from 'react';
import HeaderButton from './components/headerButton';

import style from './header.module.scss';

const namesOfButtons: [string, string][] = [
  ['Authorization', '/authorization'],
  ['Mini-Games', '/games'],
  ['Statistics', '/statistics'],
  ['Settings', '/settings']
];

const Header:React.ComponentType = () => (
  <div className={`${style.headerButtons}`}>
    {
      namesOfButtons.map((el, i) => (
        <HeaderButton
          title={el[0]}
          link={el[1]}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
        />
      ))
    }
  </div>
);

export default Header;
