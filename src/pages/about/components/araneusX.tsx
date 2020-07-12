import React from 'react';

import style from '../about.module.scss';
import { araneusx } from '../data/todolist';
import ToDoList from './ListToDo';
import ToDo from './interface';
// Oleshkevich Alexander Александр Олешкевич araneusX
const AraneusX = () => (
  <div>
    <div className={style['todo-avatar']}>
      <img className={style.avatar} alt="zhenokin" src="https://avatars3.githubusercontent.com/u/59386684?s=400&u=07192b0380402eba34e872241e0229cd36d77ac4&v=4" />
    </div>
    <div className={style['todo-data']}>
      <div className={style['todo-name']}>
        <span className={style.name}>Александр Олешкевич</span>
        <span className={style.role}>Team Lead</span>
      </div>
      <div className={style.todo}>
        {araneusx.map((todo: ToDo) => <ToDoList key={todo.title} todo={todo} style={style} />)}
      </div>
      <div className={style.github}>
        Github:
        <a href="https://github.com/araneusX" style={{ textDecoration: 'none' }}> araneusX</a>
      </div>
    </div>
  </div>
);

export default AraneusX;
