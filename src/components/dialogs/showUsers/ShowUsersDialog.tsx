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
import { routes, pagination } from '../../../config/constants';
import { Transition } from '../addTodo/styles';
import { UsersData } from '../../../utils/interfaces/users';
import { TodoCheckbox } from '../../checkbox/TodoCheckbox';
import { TodoPagination } from '../../pagination/TodoPagination';
import axios from 'axios';

interface Props {
  open: boolean;
  closeDialog: () => void;
}

export const ShowUsersDialog = ({ open, closeDialog }: Props) => {
  const [ users, setUsers ] = useState<UsersData[]>([]);
  const [ todosNumber, setTodosNumber ] = useState<number[]>([]);
  const [ allUsersCount, setAllUsersCount ] = useState<number>(0);

  const [ isOpen, setOpen ] = useState<boolean>(open);
  const [ chosenUsers, setChosenUsers ] = useState<number[]>([]);

  const [ currentPer, setPer ] = useState<number>(pagination.rowsOnPage[0]);
  const [ currentPage, setPage ] = useState<number>(1);

  const getUsers = (newPer: number, newPage: number) => {
    axios.get(`${routes.server}/${routes.users}`, {
      params: {
        per: newPer,
        page: newPage
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
    }}).then(res => {
      setUsers(res.data.users);
      setTodosNumber(res.data.todos_number);
      setAllUsersCount(res.data.total_record_count);
      setChosenUsers([]);
    });
    
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
  
  return(
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeDialog}
      fullWidth
    >
      <DialogTitle>All users</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Number of todos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => {
                return(
                  <TableRow key={user.id}>
                    <TableCell>
                      <TodoCheckbox 
                        itemId={user.id} 
                        chosenItems={chosenUsers} 
                        setChosenItems={setChosenUsers}
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
                  <TodoPagination
                    items={users}
                    getItems={getUsers}
                    allItemsCount={allUsersCount}
                    page={allUsersCount === users.length ? 1 : currentPage}
                    per={currentPer}
                    setPage={setPage}
                    setPer={setPer}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} variant='contained' color='secondary'>
          Cancel
        </Button>
        <Button onClick={confirm} variant='contained' color='primary' disabled={chosenUsers.length === 0}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}