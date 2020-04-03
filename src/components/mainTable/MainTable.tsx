import React from 'react';
import { GetTodos, Data } from '../../utils/requests/todos';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Options, Title, Border } from './styles';

export const MainTable:React.FC = () => {
  const todos = GetTodos();
  const columns: string[] = ['Title', 'State', 'Assigned to', 'End date'];

  return (
    <TableContainer component={Paper}>
      <Options>
        <Title>Todos</Title>
        <Button variant="outlined">Add</Button>
      </Options>
      <Border></Border>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column: string) => {
              return <TableCell key={ column }>{ column }</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo: Data) => {
            return (
              <TableRow key={ todo.id }>
                <TableCell>{ todo.title }</TableCell>
                <TableCell>{ todo.state }</TableCell>
                <TableCell>{ todo.user_name }</TableCell>
                <TableCell>{ todo.deadline }</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

