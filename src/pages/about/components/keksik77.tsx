import React from 'react';

import style from '../about.module.scss';
import { keksik77 } from '../data/todolist';
import ToDo from './interface';
import ToDoList from './ListToDo';
// Timofei Lukashevich Тимофей Лукашевич keksik77
const Keksik77 = () => (
  <div>
    <div className={style['todo-avatar']}>
      <img className={style.avatar} alt="zhenokin" src="https://avatars3.githubusercontent.com/u/60549991?s=400&u=ffc9f49857ec6dc14204e07699ed032fefb3b842&v=4" />
    </div>
    <div className={style['todo-data']}>
      <div className={style['todo-name']}>
        <span className={style.name}>Тимофей Лукашевич</span>
        <span className={style.role}>Developer</span>
      </div>
      <div className={style.todo}>
        {keksik77.map((todo: ToDo) => <ToDoList key={todo.title} todo={todo} style={style} />)}
      </div>
      <div className={style.github}>
        Github:
        <a href="https://github.com/keksik77" style={{ textDecoration: 'none' }}> keksik77</a>
      </div>
    </div>
  </div>
);

export default Keksik77;
