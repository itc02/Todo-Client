import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { DialogTitle } from '../addTodo/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import { filterCriterias, columns, titles, pagination } from '../../../utils/staticData/constants';
import { buttons, routes } from '../../../utils/staticData/enums';
import { Transition } from '../addTodo/styles';
import { UsersData } from '../../../utils/interfaces/users';
import Checkbox from '../../checkbox/TodoCheckbox';
import Pagination from '../../pagination/TodoPagination';
import Filtration from '../../filtration/Filtration';
import axios from 'axios';

interface Props {
  open: boolean;
  closeDialog: () => void;
}

export const ShowUsersDialog:React.FC<Props> = ({ open, closeDialog }) => {
  const [ users, setUsers ] = useState<UsersData[]>([]);
  const [ todosNumber, setTodosNumber ] = useState<number[]>([]);
  const [ allUsersCount, setAllUsersCount ] = useState<number>(0);

  const [ isOpen, setOpen ] = useState<boolean>(open);
  const [ chosenUsers, setChosenUsers ] = useState<number[]>([]);

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
      ids: chosenUsers
    }}).then(() => {
      getUsers(currentPer, currentPage);
      setChosenUsers([]);
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
    setOpen(open);
    getUsers(currentPer, currentPage);
  }, [ open ]);
  
  useEffect(() => {
    getUsers(currentPer, currentPage);
  }, [searchString]);

  return(
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeDialog}
      fullWidth
    >
      <DialogTitle>{titles.users.all}</DialogTitle>
      <DialogContent>
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
                {columns.users.map(column => {
                  return (
                    <TableCell key={column}>{ column
                       }</TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => {
                return(
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox 
                        itemId={user.id} 
                        selectedItems={chosenUsers} 
                        setSelectedItems={setChosenUsers}
                        isDisabled={todosNumber[index] !== 0}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={close} variant='contained' color='secondary'>
          {buttons.cancel}
        </Button>
        <Button onClick={confirm} variant='contained' color='primary' disabled={chosenUsers.length === 0}>
          {buttons.delete}
        </Button>
      </DialogActions>
    </Dialog>
  );
}