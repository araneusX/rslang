import React from 'react';

import style from './about.module.scss';

import AraneusX from './components/araneusX';
import Nastja2000 from './components/Nastja2000';
import MrINEX from './components/mrINEX';
import Keksik77 from './components/keksik77';
import PavelChukashev from './components/PavelChukashev';
import Zhenokin from './components/zhenokin';
import SLeshenko from './components/SLeshenko';

const About = () => (
  <div className={style['about-page']}>
    <div className={style['about-header']}>
      <p className={style['about-title']}>О команде</p>
      <p className={style['about-main']}>Если хочешь познакомится с нашей командой поближе, то ты попал по адресу! Нас семеро весёлых, компанейских, а главное горящих своим делом человек. Мы собрались с разных городов и стран, чтобы сделать одно крутое дело. Про каждого из нас более подробно ниже</p>
      <div className={style['about-image']} />
    </div>
    <AraneusX />
    <SLeshenko />
    <Nastja2000 />
    <MrINEX />
    <Keksik77 />
    <PavelChukashev />
    <Zhenokin />
  </div>
);

export default About;
