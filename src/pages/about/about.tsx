import React from 'react';

import style from './about.module.scss';

import AraneusX from './components/araneusX';
import Nastja2000 from './components/Nastja2000';
import MrINEX from './components/mrINEX';
import Keksik77 from './components/keksik77';
import PavelChukashev from './components/PavelChukashev';
import Terra456 from './components/terra456';
import SLeshenko from './components/SLeshenko';

const About = () => (
  <div className={style['about-page']}>
    <AraneusX />
    <SLeshenko />
    <Nastja2000 />
    <MrINEX />
    <Keksik77 />
    <PavelChukashev />
    <Terra456 />
  </div>
);

export default About;
