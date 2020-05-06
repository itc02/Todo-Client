import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { DialogTitle, StyledFormControl } from '../addTodo/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import { routes, labels, textFields } from '../../../config/constants';
import { Transition } from '../addTodo/styles';
import { UsersData } from '../../../utils/interfaces/users';
import axios from 'axios';

interface Props {
  open: boolean;
  closeDialog: () => void;
}

export const AddUserDialog:React.FC<Props> = ({ open, closeDialog }) => {
  const [ users, setUsers ] = useState<UsersData[]>([]);

  const [ isOpen, setOpen ] = useState<boolean>(open);

  const [ user, setUser ] = useState<string>('');

  const handleUser = (event: any) => {
    setUser(event.target.value);
  }

  const isDataValid = () => {
    return user && !users.map(user => user.user_name).includes(user);
  }

  const close = () => {
    setUser('');
    closeDialog();
  }

  const confirm = () => {
    if(isDataValid()) {
      setUser('');
      axios.post(`${routes.server}/${routes.users}`, {
        user_name: user
      });
      closeDialog();
    }
  }

  useEffect(() => {
    setOpen(open);
    axios.get(`${routes.server}/${routes.users}/${routes.allUsers}`).then(res => {
      setUsers(res.data);
    });
  }, [ open ]);

  return(
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeDialog}
      fullWidth
    >
      <DialogTitle>Add user</DialogTitle>
      <DialogContent>
        <StyledFormControl fullWidth>
          <TextField
            value={user}
            label={labels.user}
            variant='outlined'
            fullWidth
            inputProps={{ maxLength: textFields.user.maxLength }}
            onChange={handleUser}
          ></TextField>
          <FormHelperText>Symbols: {user.length}/{textFields.user.maxLength}</FormHelperText>
        </StyledFormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} variant='contained' color='secondary'>
          Cancel
        </Button>
        <Button onClick={confirm} variant='contained' color='primary' disabled={!isDataValid()}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}