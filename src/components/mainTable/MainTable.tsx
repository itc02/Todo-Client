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
import { DeleteItems } from '../dialogs/deleteItems/DeleteItems';
import { routes, pagination, columns, dateFormats, orders, sortingCriterias, searchCriterias, titles, buttons } from '../../config/constants';
import axios from 'axios';
import moment from 'moment';
import UnitCheckbox from '../checkbox/UnitCheckbox';
import MainCheckbox from '../checkbox/MainCheckbox';
import Pagination from '../pagination/TodoPagination';
import Filtration from '../filtration/Filtration';
import { useGlobalState } from '../../utils/globalState/useGlobalState';
import { ActionTypes } from '../../utils/globalState/actions';

export const MainTable:React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const { selectedTodos } = state;

  const [ openAddDialog, setOpenAddDialog ] = useState<boolean>(false);
  const [ openAddUserDialog, setOpenAddUserDialog ] = useState<boolean>(false);
  const [ openShowUsersDialog, setOpenShowUsersDialog ] = useState<boolean>(false);
  const [ openDeleteItemsDialog, setOpenDeleteItemsDialog ] = useState<boolean>(false);
  const [ isEdit, setIsEdit ] = useState<boolean>(false);
  
  const [ todos, setTodos ] = useState<TodosData[]>([]);
  const [ currentPer, setPer ] = useState<number>(pagination.rowsOnPage[0]);
  const [ currentPage, setPage ] = useState<number>(1);
  const [ allTodosCount, setAllTodosCount ] = useState<number>(0);

  const [ sortingCriteria, setSortingCriteria ] = useState<string>(sortingCriterias.todos[0]);
  const [ order, setOrder ] = useState<string>(orders[0]);
  const [ searchString, setSearchString ] = useState<string>('');
  const [ searchCriteria, setSearchCriteria ] = useState<string>(searchCriterias.todos[0]);

  const getTodos = (newPer: number, newPage: number) => {
    axios.get(`${routes.server}/${routes.todos}`, {
      params: {
        per: newPer,
        page: newPage,
        order,
        sorting_criteria: sortingCriteria,
        search_string: searchString,
        search_criteria: searchCriteria
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

  const deleteTodos = (isDelete: boolean) => {
    if(isDelete) {
      axios.delete(`${routes.server}/${routes.todos}`, { data: {
        ids: selectedTodos
      }}).then(() => {
        getTodos(currentPer, currentPage);
        dispatch({type: ActionTypes.CLEAR_TODOS})
      });
    }
  }

  const sortTodos = (e: any) => {
    const index = orders.indexOf(order)
    const newOrder = orders[index === orders.length - 1 ? 0 : index + 1];
    const newCriteria = e.target.id;
    setSortingCriteria(newCriteria);
    setOrder(newOrder);
  }

  const filterTodos = (newSearchString: string, newSearchCriteria: string) => {
    setSearchString(newSearchString);
    setSearchCriteria(newSearchCriteria);
  }

  useEffect(() => {
    getTodos(currentPer, currentPage);
  }, [ currentPage, currentPer, order, searchString ]);

  return (
    <TableContainer component={Paper}>
      <Options>
        <Title>{titles.todos.main}</Title>
        <Filtration 
          filterData={filterTodos}
          columns={columns.todos.slice(1)}
          searchCriterias={searchCriterias.todos}
        />
        <div>
          <MarginedButton variant='outlined' onClick={() => { setOpenShowUsersDialog(true) }}>{titles.users.all}</MarginedButton>
          <MarginedButton variant='outlined' onClick={() => { setOpenAddDialog(true); setIsEdit(false) }}>{titles.todos.add}</MarginedButton>
          <MarginedButton variant='outlined' onClick={() => { setOpenAddUserDialog(true) }}>{titles.users.add}</MarginedButton>
        </div>
      </Options>
      <Border></Border>
      <Table>
        <TableHead>
          <TableRow>
            {columns.todos.map((column: string, index: number) => {
              return (
                <TableCell key={ column }>
                  {index === 0 &&
                    <MainCheckbox 
                      setAllAction={ActionTypes.SET_ALL_TODOS}
                      clearAllAction={ActionTypes.CLEAR_TODOS}
                      route={routes.todos}
                    />
                  }
                  {index !== 0 &&
                    <Arrow 
                      className={order ? `fa fa-arrow-${order === 'ASC' ? `up` : `down`}` : `fa fa-minus`} 
                      onClick={sortTodos} 
                      id={sortingCriterias.todos[index - 1]}
                    />
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
                  <UnitCheckbox 
                    itemId={todo.id}
                    removeAction={ActionTypes.REMOVE_TODO}
                    addAction={ActionTypes.ADD_TODO}
                    selectedItems={selectedTodos}
                  />
                </TableCell>
                <TableCell>{ todo.title }</TableCell>
                <StyledTableCell>{ todo.state }</StyledTableCell>
                <TableCell>{ todo.user_name }</TableCell>
                <TableCell>{ moment(todo.deadline).format(dateFormats.default.moment) }</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              <Options>
                <MarginedButton variant='outlined' disabled={selectedTodos.length === 0} onClick={() => { setOpenDeleteItemsDialog(true) }}>
                  {buttons.delete}
                </MarginedButton>
                <MarginedButton variant='outlined' disabled={selectedTodos.length !== 1} onClick={() => { setOpenAddDialog(true); setIsEdit(true) }} >
                  {titles.edit}
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
        id={selectedTodos[0]}
      />
      <AddUserDialog
        open={openAddUserDialog}
        closeDialog={() => { setOpenAddUserDialog(false) }}
      />
      <ShowUsersDialog
        open={openShowUsersDialog}
        closeDialog={() => { setOpenShowUsersDialog(false) }}
      />
      <DeleteItems
        open={openDeleteItemsDialog}
        closeDialog={() => { setOpenDeleteItemsDialog(false) }}
        handleDelete={ deleteTodos }
      />
    </TableContainer>
  );
}
