import React, { useState, useEffect } from 'react';
import { TodosData } from '../../utils/interfaces/todos'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import { Options, Title, Border, StyledTableCell } from './styles';
import Button from '@material-ui/core/Button';
import { AddTodoDialog } from '../dialogs/addTodo/AddTodoDialog';
import { columns, dateFormats, pagination } from '../../config/constants';
import Pagination from '@material-ui/lab/Pagination';
import { StyledPagination } from './styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {routes} from '../../config/constants';
import axios from 'axios';
import moment from 'moment';

export const MainTable:React.FC = () => {
  const [ openAddDialog, setOpenAddDialog ] = useState(false);

  const [ todos, setTodos ] = useState([]);
  const [ currentPer, setPer ] = useState(5);
  const [ currentPage, setPage ] = useState(1);
  const [ allTodosCount, setAllTodosCount ] = useState(0);

  const getTodos = (newPer: number, newPage: number) => {
    axios.get(`${routes.server}/${routes.todos}`, {
      params: {
        per: newPer,
        page: newPage
      }
    }).then(res => {
      setTodos(res.data.todos);
      setAllTodosCount(res.data.total_record_count);
    });
  }

  const handlePerChange = (event: any) => {
    const per = parseInt(event.target.value);
    setPer(per);
    getTodos(per, currentPage);
  }
  
  const handlePageChange = (event: any, page: any) => {
    setPage(parseInt(page));
    getTodos(currentPer, page);
  }

  const createTodo = (data: any) => {
    axios.post(`${routes.server}/${routes.todos}`, data).then(res => {
      setTodos(res.data);
    });
  }

  const pagesCount = () => {
    return todos.length === 0 ? 1 : Math.ceil(allTodosCount / currentPer);
  }

  useEffect(() => {
    getTodos(currentPer, currentPage);
  }, [ currentPage, currentPer ]);

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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <StyledPagination>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentPer}
                  onChange={handlePerChange}
                >
                  { pagination.rowsOnPage.map(page => <MenuItem key={page} value={page}>{page}</MenuItem> ) }
                </Select>
                <Pagination onChange={handlePageChange} count={pagesCount()} page={currentPage} color='primary'/>
              </StyledPagination>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <AddTodoDialog 
        open={openAddDialog} 
        closeDialog={() => {setOpenAddDialog(false)}}
        createTodo={createTodo}
      ></AddTodoDialog>
      
    </TableContainer>
  );
}
