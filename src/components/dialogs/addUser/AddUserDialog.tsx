import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { DialogTitle, StyledFormControl } from '../addTodo/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import { textFields, titles } from '../../../utils/staticData/constants';
import { buttons, helpers,  routes, labels } from '../../../utils/staticData/enums';
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
  const [ email, setEmail ] = useState<string>('');

  const handleUser = (event: any) => {
    setUser(event.target.value);
  }

  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  }

  const isDataValid = () => {
    return user && email && !users.map(user => user.user_name).includes(user);
  }

  const close = () => {
    clear();
    closeDialog();
  }

  const confirm = () => {
    if(isDataValid()) {
      clear();
      axios.post(`${routes.server}/${routes.users}`, {
        user_name: user,
        email
      });
      closeDialog();
    }
  }

  const clear = () => {
    setUser('');
    setEmail('');
  }

  useEffect(() => {
    setOpen(open);
    axios.get(`${routes.server}/${routes.users}`, {
      params: {
        without_pagination: true
      }
    }).then(res => {
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
      <DialogTitle>{titles.users.add}</DialogTitle>
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
          <FormHelperText>{helpers.symbol}: {user.length}/{textFields.user.maxLength}</FormHelperText>
        </StyledFormControl>

        <StyledFormControl fullWidth>
          <TextField
            value={email}
            label={labels.email}
            variant='outlined'
            fullWidth
            onChange={handleEmail}
          ></TextField>
        </StyledFormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} variant='contained' color='secondary'>
          {buttons.cancel}
        </Button>
        <Button onClick={confirm} variant='contained' color='primary' disabled={!isDataValid()}>
          {titles.add}
        </Button>
      </DialogActions>
    </Dialog>
  );
}