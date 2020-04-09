import React, { useState } from 'react';
import { useTodos, TodosData } from '../../utils/requests/todos';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Options, Title, Border, StyledTableCell } from './styles';
import { AddTodoDialog } from '../dialogs/addTodo/AddTodoDialog';
import { columns, dateFormats, pagination } from '../../config/constants';
import TablePagination from '@material-ui/core/TablePagination';
import { TablePaginationActions } from '../pagination/TablePaginationActions';
import moment from 'moment';

export const MainTable:React.FC = () => {
  const todos = useTodos();
  const [ openAddDialog, setOpenAddDialog ] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pagination.rowsOnPage[0]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, todos.length - page * rowsPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  
  return (
    // FE table pagination -> https://codesandbox.io/s/x52qj?file=/demo.tsx
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
          {(rowsPerPage > 0
              ? todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : todos
            ).map((todo: TodosData) => {
            return (
              <TableRow key={ todo.id }>
                <TableCell>{ todo.title }</TableCell>
                <StyledTableCell>{ todo.state }</StyledTableCell>
                <TableCell>{ todo.user_name }</TableCell>
                <TableCell>{ moment(todo.deadline).format(dateFormats.default) }</TableCell>
              </TableRow>
            )
          })}
          {emptyRows > 0 && (
            <TableRow style={{ height: pagination.rowHeight * emptyRows }}>
              <TableCell colSpan={columns.length * 2} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={pagination.rowsOnPage}
              colSpan={columns.length}
              count={todos.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
            />  
          </TableRow>
        </TableFooter>
      </Table>
      <AddTodoDialog 
        open={openAddDialog} 
        closeDialog={() => {setOpenAddDialog(false)}}
      ></AddTodoDialog>
      
    </TableContainer>
  );
}

