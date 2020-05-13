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
import { Options, Title, Border, StyledTableCell, MarginedButton, Arrow } from './styles';
import { AddTodoDialog } from '../dialogs/addTodo/AddTodoDialog';
import { AddUserDialog } from '../dialogs/addUser/AddUserDialog';
import { ShowUsersDialog } from '../dialogs/showUsers/ShowUsersDialog';
import { columns, dateFormats } from '../../config/constants';
import { routes, pagination } from '../../config/constants';
import axios from 'axios';
import moment from 'moment';
import Checkbox from '../checkbox/TodoCheckbox';
import Pagination from '../pagination/TodoPagination';
import { UsersData } from '../../utils/interfaces/users';

export const MainTable:React.FC = () => {
  const [ openAddDialog, setOpenAddDialog ] = useState<boolean>(false);
  const [ openAddUserDialog, setOpenAddUserDialog ] = useState<boolean>(false);
  const [ openShowUsersDialog, setOpenShowUsersDialog ] = useState<boolean>(false);
  const [ isEdit, setIsEdit ] = useState<boolean>(false);
  
  const [ todos, setTodos ] = useState<TodosData[]>([]);
  const [ users, setUsers ] = useState<UsersData[]>([]);
  const [ currentPer, setPer ] = useState<number>(pagination.rowsOnPage[0]);
  const [ currentPage, setPage ] = useState<number>(1);
  const [ allTodosCount, setAllTodosCount ] = useState<number>(0);
  const [ chosenTodos, setChosenTodos ] = useState<number[]>([]);

  const sortingCriterias = ['title', 'state', 'user_name', 'deadline'];
  const [ sortingCriteria, setSortingCriteria ] = useState<string>(sortingCriterias[0]);
  const [ order, setOrder ] = useState<string>('ASC');

  const getUsers = () => {
    axios.get(`${routes.server}/${routes.users}`, {
      params: {
        without_pagination: true
      }
    }).then(res => {
      setUsers(res.data);
    })
  }

  const getTodos = (newPer: number, newPage: number) => {
    axios.get(`${routes.server}/${routes.todos}`, {
      params: {
        per: newPer,
        page: newPage,
        order,
        sorting_criteria: sortingCriteria
      }
    }).then(res => {
      setTodos(res.data.todos);
      setAllTodosCount(res.data.total_record_count);
    });
  }

  const createTodo = ({title, deadline, assigned_to, description}: any) => {
    axios.post(`${routes.server}/${routes.todos}`, {
      title,
      deadline,
      assigned_to,
      description,
      page: currentPage,
      per: currentPer
    }).then(res => {
      setTodos(res.data.todos);
      setAllTodosCount(res.data.total_record_count);
    });
  }

  const editTodo = ({id, title, deadline, assigned_to, description, state}: any) => {
    axios.put(`${routes.server}/${routes.todos}/${id}`, {
      title,
      deadline,
      assigned_to,
      description,
      state
    }).then(res => {
      getTodos(currentPer, currentPage);
    })
  }

  const deleteTodos = () => {
    axios.delete(`${routes.server}/${routes.todos}`, { data: {
      ids: chosenTodos
    }}).then(res => {
      setTodos(res.data.todos);
      setAllTodosCount(res.data.total_record_count);
    });
    setChosenTodos([]);
  }

  const sortTodos = (e: any, ) => {
    const newOrder = order === 'DESC' ? 'ASC' : 'DESC';
    const newCriteria = e.target.id;
    setSortingCriteria(newCriteria);
    setOrder(newOrder);
  }

  useEffect(() => {
    getTodos(currentPer, currentPage);
  }, [ currentPage, currentPer, order ]);

  return (
    <TableContainer component={Paper}>
      <Options>
        <Title>Todos</Title>
        <div>
          <MarginedButton variant='outlined' onClick={() => { setOpenShowUsersDialog(true) }}>All users</MarginedButton>
          <MarginedButton variant='outlined' onClick={() => { setOpenAddDialog(true); setIsEdit(false) }}>Add todo</MarginedButton>
          <MarginedButton variant='outlined' onClick={() => { setOpenAddUserDialog(true) }}>Add user</MarginedButton>          
        </div>
      </Options>
      <Border></Border>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column: string, index: number) => {
              return (
                <TableCell key={ column }>
                  {index !== 0 &&
                    <Arrow className={order ? `fa fa-arrow-${order === 'ASC' ? `up` : `down`}` : `fa fa-minus`} onClick={sortTodos} id={sortingCriterias[index - 1]}></Arrow>
                  }
                  { column }
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo: TodosData) => {
            return (
              <TableRow key={ todo.id }>
                <TableCell style={{width: '1px'}}>
                  <Checkbox 
                    itemId={todo.id} 
                    selectedItems={chosenTodos} 
                    setSelectedItems={setChosenTodos}
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
              <Options>
                <MarginedButton variant='outlined' disabled={chosenTodos.length === 0} onClick={deleteTodos}>
                  Delete
                </MarginedButton>
                <MarginedButton variant='outlined' disabled={chosenTodos.length !== 1} onClick={() => { setOpenAddDialog(true); setIsEdit(true) }} >
                  Edit
                </MarginedButton>
              </Options>
            </TableCell>
            <TableCell colSpan={4}>
              <Pagination 
                items={todos}
                getItems={getTodos}
                allItemsCount={allTodosCount}
                page={allTodosCount === todos.length ? 1 : currentPage}
                per={currentPer}
                setPage={setPage}
                setPer={setPer}
                isSorted={Boolean(sortingCriteria)}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      
      <AddTodoDialog 
        open={openAddDialog} 
        closeDialog={() => { setOpenAddDialog(false) }}
        createTodo={createTodo}
        isEdit={isEdit}
        editTodo={editTodo}
        prevData={todos.find(todo => todo.id === chosenTodos[0]) || todos[0]}
      />
      <AddUserDialog
        open={openAddUserDialog}
        closeDialog={() => { setOpenAddUserDialog(false) }}
      />
      <ShowUsersDialog
        open={openShowUsersDialog}
        closeDialog={() => { setOpenShowUsersDialog(false) }}
      />
    </TableContainer>
  );
}
