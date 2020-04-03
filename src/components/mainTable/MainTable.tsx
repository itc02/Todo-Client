import React from 'react';
import { GetTodos } from '../../utils/requests/todos';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './MainTable.css';

interface Row {
  title: string;
  state: string;
  assignedTo: string;
  deadline: Date;
}

export const MainTable:React.FC = () => {
  const todosWithAllOptions = GetTodos();
  const todos: Row[] = todosWithAllOptions.map(todo => {
    return {
      title: todo.title,
      state: todo.state,
      assignedTo: todo.user_name,
      deadline: todo.deadline
    }
  });
  const columns: string[] = ['Title', 'State', 'Assigned to', 'End date'];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column: string, index: number) => {
              return <TableCell key={ index }>{ column }</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo: Row, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell>{ todo.title }</TableCell>
                <TableCell>{ todo.state }</TableCell>
                <TableCell>{ todo.assignedTo }</TableCell>
                <TableCell>{ todo.deadline }</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

