import React, { useState } from 'react';
import { GetTodos, TodosData } from '../../utils/requests/todos';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Options, Title, Border, StyledTableCell } from './styles';
import { AddTodoDialog } from '../dialogs/addTodo/AddTodoDialog';
import { columns, dateFormats } from '../../config/constants';
import moment from 'moment';

export const MainTable = () => {
  const todos = GetTodos();
  const [ openAddDialog, setOpenAddDialog ] = useState(false);

  return (
    <TableContainer component={Paper}>
      <Options>
        <Title>Todos</Title>
        <Button variant="outlined" onClick={() => {setOpenAddDialog(true)}}>Add</Button>
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
          {todos.map((todo: TodosData) => {
            return (
              <TableRow key={ todo.id }>
                <TableCell>{ todo.title }</TableCell>
                <StyledTableCell>{ todo.state }</StyledTableCell>
                <TableCell>{ todo.user_name }</TableCell>
                <TableCell>{ moment(todo.deadline).format(dateFormats.default) }</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <AddTodoDialog 
        open={openAddDialog} 
        closeDialog={() => {setOpenAddDialog(false)}}
      ></AddTodoDialog>
    </TableContainer>
  );
}

