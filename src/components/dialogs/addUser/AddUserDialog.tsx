import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { StyledFormControl } from '../addTodo/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import { textFields } from '../../../utils/staticData/constants';
import { routes, labels } from '../../../utils/staticData/enums';
import { UsersData } from '../../../utils/interfaces/users';
import { DialogStructure }from '../common/DialogStructure';
import axios from 'axios';

interface Props {
  open: boolean;
  closeDialog: () => void;
}

export const AddUserDialog:React.FC<Props> = ({ open, closeDialog }) => {
  const [ users, setUsers ] = useState<UsersData[]>([]);

  const [ user, setUser ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');

  const handleUser = (event: any) => {
    setUser(event.target.value);
  }

  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  }

  const isDataInvalid = (): boolean => {
    return (
      !user ||
      !email ||
      users.map(user => user.user_name).includes(user)
    )
  }

  const close = () => {
    clear();
    closeDialog();
  }

  const confirm = () => {
    if(!isDataInvalid()) {
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
    axios.get(`${routes.server}/${routes.users}`, {
      params: {
        without_pagination: true
      }
    }).then(res => {
      setUsers(res.data);
    });
  }, [ open ]);

  return(
    <DialogStructure
      open={open}
      title='Add user'
      action='Add'
      isInvalid={isDataInvalid()}
      close={close}
      confirm={confirm}
    >
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

        <StyledFormControl fullWidth>
          <TextField
            value={email}
            label={labels.email}
            variant='outlined'
            fullWidth
            onChange={handleEmail}
          ></TextField>
        </StyledFormControl>
    </DialogStructure>
  );
}
