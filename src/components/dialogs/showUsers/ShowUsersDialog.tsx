import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import { filterCriterias, columns, pagination } from '../../../utils/staticData/constants';
import { routes } from '../../../utils/staticData/enums';
import { UsersData } from '../../../utils/interfaces/users';
import CustomCheckbox from '../../checkbox/CustomCheckbox';
import Pagination from '../../pagination/TodoPagination';
import Filtration from '../../filtration/Filtration';
import axios from 'axios';
import { useGlobalState } from '../../../utils/globalState/useGlobalState';
import { ActionTypes } from '../../../utils/globalState/actions';
import MainCheckbox from '../../checkbox/MainCheckbox';
import { DialogStructure }from '../common/DialogStructure';

interface Props {
  open: boolean;
  closeDialog: () => void;
}

export const ShowUsersDialog:React.FC<Props> = ({ open, closeDialog }) => {
  const { state, dispatch } = useGlobalState();
  const { selectedUsers } = state;

  const [ users, setUsers ] = useState<UsersData[]>([]);
  const [ todosNumber, setTodosNumber ] = useState<number[]>([]);
  const [ allUsersCount, setAllUsersCount ] = useState<number>(0);

  const [ currentPer, setPer ] = useState<number>(pagination.defaultPer);
  const [ currentPage, setPage ] = useState<number>(pagination.defaultPage);

  const [ searchString, setSearchString ] = useState<string>('');
  const [ filterCriteria, setFilterCriteria ] = useState<string>(filterCriterias.defaultUserCriteria);

  const getUsers = (newPer: number, newPage: number) => {
    axios.get(`${routes.server}/${routes.users}`, {
      params: {
        per: newPer,
        page: newPage,
        search_string: searchString,
        search_criteria: filterCriteria
      }
    }).then(res => {
      setUsers(res.data.users);
      setTodosNumber(res.data.todos_number);
      setAllUsersCount(res.data.total_record_count);
    });
  }

  const deleteUsers = () => {
    axios.delete(`${routes.server}/${routes.users}`, { data: {
      ids: selectedUsers
    }}).then(() => {
      getUsers(currentPer, currentPage);
      dispatch({type: ActionTypes.CLEAR_USERS});
    });
  }

  const filterUsers = (newSearchString: string, newSearchCriteria: string) => {
    setSearchString(newSearchString);
    setFilterCriteria(newSearchCriteria);
  }

  const close = () => {
    closeDialog();
  }

  const confirm = () => {
    deleteUsers();
  }

  useEffect(() => {
    getUsers(currentPer, currentPage);
  }, [ open, searchString ]);

  return(
    <DialogStructure
      open={open}
      title='All users'
      close={close}
      isForm={false}
      action={'Delete'}
      confirm={confirm}
      isInvalid={!selectedUsers.length}
    >
      <Filtration
        filterData={filterUsers}
        columns={columns.users.slice(1, -1)}
        filterCriterias={filterCriterias.users}
        defaultFilterCriteria={'user_name'}
        defaultFilterLabel={'Name'}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.users.map((column: string, index: number) => {
                return (
                  <TableCell key={column}>
                    { column }
                    { index === 0 && 
                      <MainCheckbox
                        setAllAction={ActionTypes.SET_ALL_USERS}
                        clearAllAction={ActionTypes.CLEAR_USERS}
                        route={routes.users}
                        key={'aaa'}
                      /> 
                    }
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => {
              return(
                <TableRow key={user.id}>
                  <TableCell>
                    <CustomCheckbox 
                      itemId={user.id} 
                      isDisabled={todosNumber[index] !== 0}
                      removeAction={ActionTypes.REMOVE_USER}
                      addAction={ActionTypes.ADD_USER}
                      selectedItems={selectedUsers}
                    />
                  </TableCell>
                  <TableCell>{user.user_name}</TableCell>
                  <TableCell>{todosNumber[index]}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <Pagination
                  items={users}
                  getItems={getUsers}
                  allItemsCount={allUsersCount}
                  page={allUsersCount === users.length ? 1 : currentPage}
                  per={currentPer}
                  setPage={setPage}
                  setPer={setPer}
                  isSorted={false}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </DialogStructure>
  );
}
