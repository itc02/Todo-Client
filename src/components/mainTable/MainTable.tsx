import React from 'react';
import { GetTodos, Data } from '../../utils/requests/todos';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import './MainTable.css';

const Title = styled.h1`
  font-family: sans-serif;
  padding-left: 16px;
`;

const Border = styled.hr`
  border: 0.5px solid #e0e0e0;
  margin-bottom: 0px;
`;

export const MainTable:React.FC = () => {
  const todos = GetTodos();
  const columns: string[] = ['Title', 'State', 'Assigned to', 'End date'];

  return (
    <main>
      <TableContainer component={Paper}>
      <Title>Todos</Title>
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
    </main>
  );
}

