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
import { routes, pagination, columns, dateFormats, labels, orders, sortingCriterias, filterCriterias } from '../../config/constants';
import axios from 'axios';
import moment from 'moment';
import Checkbox from '../checkbox/TodoCheckbox';
import Pagination from '../pagination/TodoPagination';
import Filtration from '../filtration/Filtration';

export const MainTable:React.FC = () => {
  const [ openAddDialog, setOpenAddDialog ] = useState<boolean>(false);
  const [ openAddUserDialog, setOpenAddUserDialog ] = useState<boolean>(false);
  const [ openShowUsersDialog, setOpenShowUsersDialog ] = useState<boolean>(false);
  const [ isEdit, setIsEdit ] = useState<boolean>(false);
  
  const [ todos, setTodos ] = useState<TodosData[]>([]);
  const [ currentPer, setPer ] = useState<number>(5);
  const [ currentPage, setPage ] = useState<number>(1);
  const [ allTodosCount, setAllTodosCount ] = useState<number>(0);
  const [ chosenTodos, setChosenTodos ] = useState<number[]>([]);

  const [ sortingCriteria, setSortingCriteria ] = useState<string>('title');
  const [ order, setOrder ] = useState<string>('none');
  const [ searchString, setSearchString ] = useState<string>('');
  const [ filterCriteria, setFilterCriteria ] = useState<string>('title');

  const getTodos = (newPer: number, newPage: number) => {
    axios.get(`${routes.server}/${routes.todos}`, {
      params: {
        per: newPer,
        page: newPage,
        order,
        sorting_criteria: sortingCriteria,
        search_string: searchString,
        filter_criteria: filterCriteria
      }
    }).then(res => {
      setTodos(res.data.todos);
      setAllTodosCount(res.data.total_record_count);
    });
  }

  const createTodo = ({title, deadline, userId, description}: any) => {
    axios.post(`${routes.server}/${routes.todos}`, {
      title,
      deadline,
      user_id: userId,
      description,
    }).then(res => {
      getTodos(currentPer, currentPage);
    });
  }

  const editTodo = ({id, title, deadline, userId, description, state}: any) => {
    axios.put(`${routes.server}/${routes.todos}/${id}`, {
      title,
      deadline,
      user_id: userId,
      description,
      state
    }).then(res => {
      getTodos(currentPer, currentPage);
    })
  }

  const deleteTodos = () => {
    axios.delete(`${routes.server}/${routes.todos}`, { data: {
      ids: chosenTodos
    }}).then(() => {
      getTodos(currentPer, currentPage);
    });
    setChosenTodos([]);
  }

  const sortTodos = (e: any) => {
    const index = orders.indexOf(order)
    const newOrder = orders[index == orders.length - 1 ? 0 : index + 1];
    const newCriteria = e.target.id;
    setSortingCriteria(newCriteria);
    setOrder(newOrder);
  }

  const filterTodos = (newSearchString: string, newSearchCriteria: string) => {
    setSearchString(newSearchString);
    setFilterCriteria(newSearchCriteria);
  }

  useEffect(() => {
    getTodos(currentPer, currentPage);
  }, [ currentPage, currentPer, order, searchString ]);

  return (
    <TableContainer component={Paper}>
      <Options>
        <Title>Todos</Title>
        <Filtration 
          filterData={filterTodos}
          columns={columns.todos.slice(1)}
          filterCriterias={filterCriterias.todos}
          defaultFilterCriteria={'title'}
          defaultFilterLabel={'Title'}
        />
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
            {columns.todos.map((column: string, index: number) => {
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
