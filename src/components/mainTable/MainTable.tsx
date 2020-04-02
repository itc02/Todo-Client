import React from 'react';
import { GetTodos } from '../../utils/requests/todos';
import './MainTable.css';

export const MainTable:React.FC = () => {
  const todos = GetTodos();

  return(
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>State</th>
          <th>Assigned to</th>
          <th>Deadline</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo: any, index: number) => {
          return (
            <tr key={index}>
              <td>{ todo.title }</td>
              <td>{ todo.state }</td>
              <td>{ todo.user_name }</td>
              <td>{ todo.deadline }</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
