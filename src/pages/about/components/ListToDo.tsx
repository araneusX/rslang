import React from 'react';
import ToDo from './interface';

function ToDoList(props: { todo: ToDo; style: any; }) {
  const { todo, style } = props;
  const { title, criterias } = todo;
  return (
    <div className={style['todo-item']}>
      <span>{title}</span>
      <ul>
        {criterias.map((criteria, index) => <li key={index.toString()}>{criteria}</li>)}
      </ul>
    </div>
  );
}

export default ToDoList;
