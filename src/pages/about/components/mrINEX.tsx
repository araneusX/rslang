import React from 'react';

import style from '../about.module.scss';
import { mrINEX } from '../data/todolist';
import ToDo from './interface';
import ToDoList from './ListToDo';
// Kazak Uladzimir Владимир Казак mrINEX
const MrINEX = () => (
  <div>
    <div className={style['todo-avatar']}>
      <img className={style.avatar} alt="zhenokin" src="https://avatars1.githubusercontent.com/u/35580404?s=400&u=742a3a17f24933ff191b620cf949e6f1b872e20a&v=4" />
    </div>
    <div className={style['todo-data']}>
      <div className={style['todo-name']}>
        <span className={style.name}>Владимир Казак</span>
        <span className={style.role}>Developer</span>
      </div>
      <div className={style.todo}>
        {mrINEX.map((todo: ToDo) => <ToDoList key={todo.title} todo={todo} style={style} />)}
      </div>
      <div className={style.github}>
        Github:
        <a href="https://github.com/mrINEX" style={{ textDecoration: 'none' }}> mrINEX</a>
      </div>
    </div>
  </div>
);

export default MrINEX;
