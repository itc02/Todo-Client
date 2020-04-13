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
import { Options, Title, Border, StyledTableCell, MarginedButton } from './styles';
import Button from '@material-ui/core/Button';
import { AddTodoDialog } from '../dialogs/addTodo/AddTodoDialog';
import { AddUserDialog } from '../dialogs/addUser/AddUserDialog';
import { columns, dateFormats, pagination } from '../../config/constants';
import Pagination from '@material-ui/lab/Pagination';
import { StyledPagination } from './styles';
import Select from '@material-ui/core/Select';
import {routes} from '../../config/constants';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import moment from 'moment';

export const MainTable:React.FC = () => {
  const [ openAddDialog, setOpenAddDialog ] = useState(false);
  const [ openAddUserDialog, setOpenAddUserDialog ] = useState(false);

  const [ todos, setTodos ] = useState<TodosData[]>([]);
  const [ currentPer, setPer ] = useState<number>(5);
  const [ currentPage, setPage ] = useState<number>(1);
  const [ allTodosCount, setAllTodosCount ] = useState<number>(0);

  const [ chosenTodos, setChosenTodos ] = useState<number[]>([]);

  const getTodos = (newPer: number, newPage: number) => {
    axios.get(`${routes.server}/${routes.todos}`, {
      params: {
        per: newPer,
        page: newPage
      }
    }).then(res => {
      setTodos(res.data);
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

  const changeCheckboxState = (event: any) => {
    const id = parseInt(event.target.value);
    if(chosenTodos.includes(id)) {
      setChosenTodos(chosenTodos.filter(todoId => todoId !== id));
    } else {
      setChosenTodos([...chosenTodos, id]);
    }
  }

  const deleteTodos = () => {
    axios.delete(`${routes.server}/${routes.todos}/${chosenTodos}`).then(res => {
      setTodos(res.data);
      setChosenTodos([]);
    });
  }

  useEffect(() => {
    getTodos(currentPer, currentPage);
    axios.get(`${routes.server}/${routes.todos}/count`).then(res => {
      setAllTodosCount(parseInt(res.data.count));
    });
  }, [ currentPage, currentPer ]);

  return (
    <TableContainer component={Paper}>
      <Options>
        <Title>Todos</Title>
        <div>
          <MarginedButton variant="outlined" onClick={() => { setOpenAddDialog(true) }}>Add todo</MarginedButton>
          <MarginedButton variant="outlined" onClick={() => { setOpenAddUserDialog(true) }}>Add user</MarginedButton>
        </div>
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
                <TableCell style={{width: '1px'}}>
                  <Checkbox
                    color='primary'
                    checked={chosenTodos.includes(todo.id)}
                    onChange={changeCheckboxState}
                    value={todo.id}
                  />
                </TableCell>
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
            <TableCell>
              <Button
                variant='outlined'
                disabled={chosenTodos.length === 0}
                onClick={deleteTodos}
              >
                Delete
              </Button>
            </TableCell>
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
      <AddUserDialog
        open={openAddUserDialog}
        closeDialog={() => {setOpenAddUserDialog(false)}}
      ></AddUserDialog>
    </TableContainer>
  );
}
