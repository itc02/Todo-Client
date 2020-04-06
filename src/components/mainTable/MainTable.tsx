import React, { useState, useEffect } from 'react';
import { GetTodos, TodosData } from '../../utils/requests/todos';
import { GetUsers } from '../../utils/requests/users';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Options, Title, Border } from './styles';
import { capitalize } from '../dialogs/addTodo/styles';
import { AddTodoDialog } from '../dialogs/addTodo/AddTodoDialog';
import { columns, states, dateFormats } from '../../config/constants';
import moment from 'moment';

export const MainTable = () => {
  const { allTodos, loading } = GetTodos();

  const users = GetUsers();
  const [ todos, setTodos ] = useState(allTodos || []);

  const [ openAddDialog, setOpenAddDialog ] = useState(false);

  
  useEffect(() => {
    if(loading && todos.length <= allTodos.length) {
      setTodos(allTodos)
    }
  }, [loading, todos.length, allTodos]);

  const addTodo = (data: any) => {
    const { title, description, deadline, assigned_to } = data;
    setTodos([...todos, {
      id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
      title,
      description,
      deadline,
      user_id: assigned_to,
      state: states.new,
      //@ts-ignore
      user_name: users.find(user => user.id === data.assigned_to).user_name
    }]);
  }

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
                {/* @ts-ignore */}
                <TableCell style={capitalize}>{ todo.state }</TableCell>
                <TableCell>{ todo.user_name }</TableCell>
                <TableCell>{ moment(todo.deadline).format(dateFormats.default) }</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <AddTodoDialog 
        open={openAddDialog} 
        inputedData={addTodo}
        closeDialog={() => {setOpenAddDialog(false)}}
        isEditing={false}
      ></AddTodoDialog>
    </TableContainer>
    
  );
}

