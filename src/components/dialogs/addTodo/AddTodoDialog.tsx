import React, { useState, useEffect} from 'react';
import { UsersData } from '../../../utils/interfaces/users';
import { routes, labels, textFields } from '../../../config/constants';
import { DialogTitle, Transition, StyledFormControl } from './styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import { KeyboardDatePicker, MuiPickersUtilsProvider  } from '@material-ui/pickers';
import moment from 'moment';
import axios from 'axios';

import DateFnsUtils from '@date-io/date-fns';

interface Props {
  open: boolean;
  closeDialog: () => void;
  createTodo: (data: MainData) => void
}

interface MainData {
  title: string;
  deadline: Date | null;
  assigned_to: number;
  description: string
}

export const AddTodoDialog:React.FC<Props> = ({ open, closeDialog, createTodo }: Props) => {
  const [ isOpen, setOpen ] = useState<boolean>(open);

  const [ users, setUsers ] = useState<UsersData[]>([]);

  const [ title, setTitle ] = useState<string>('');
  const [ assignedTo, setAssignedTo ] = useState<string>('');
  const [ deadline, setDeadline ] = useState<Date | null>(null);
  const [ description, setDescription ] = useState<string>('');

  const handleTitle = (event: any) => {
    setTitle(event.target.value);
  }

  const handleDeadline = (date: Date | null) => {
    setDeadline(date);
  }

  const handleAssignedTo = (event: any, value: any) => {
    setAssignedTo(value);
  }

  const handleDescription = (event: any) => {
    setDescription(event.target.value);
  }

  const isDataValid = () => {
    return title && deadline && assignedTo && description && moment(deadline).isValid();
  }

  const clear = ()  => {
    setTitle('');
    setDescription('');
    setDeadline(null);
    setAssignedTo('');
  }

  const close = () => {
    clear();
    closeDialog();
  }

  const confirm = () => {
    if (isDataValid()) {
      const data = { title, deadline, assigned_to: parseInt(assignedTo), description };
      clear();
      createTodo(data);
      closeDialog();
    }
  }

  const usersId = () => [''].concat(users.map(user => user.id.toString()));

  const getOptionLabel = (option: any) => {
    const user = users.find(user => user.id.toString() === option);
    return option && user ? user.user_name : '';
  }

  const renderInput = (params: any) => <TextField {...params} label={labels.assignTo} value='' variant='outlined'/>;
  
  useEffect(() => {
    setOpen(open);
    axios.get(`${routes.server}/${routes.users}`).then(res => {
      setUsers(res.data);
    });
  }, [ open ]);

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeDialog}
      fullWidth
    >
      <DialogTitle>Add todo</DialogTitle>
      <DialogContent>
        <StyledFormControl fullWidth>
          <TextField
            value={title}
            label={labels.title}
            variant='outlined'
            fullWidth
            inputProps={{ maxLength: textFields.title.maxLength }}
            onChange={handleTitle}
          ></TextField>
          <FormHelperText>Symbols: {title.length}/{textFields.title.maxLength}</FormHelperText>
        </StyledFormControl>

        <FormControl fullWidth>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              inputVariant='outlined'
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              label={labels.deadline}
              value={deadline}
              onChange={handleDeadline}
              KeyboardButtonProps={{ 'aria-label': 'change date' }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>

        <StyledFormControl fullWidth>
          <Autocomplete
            value={assignedTo}
            options={usersId()}
            onChange={handleAssignedTo}
            getOptionLabel={getOptionLabel}
            renderInput={renderInput}
          />
        </StyledFormControl>

        <StyledFormControl fullWidth>
          <TextField
            value={description}
            variant='outlined'
            label={labels.description}
            fullWidth
            multiline
            rows={textFields.description.rows}
            onChange={handleDescription}
            inputProps={{ maxLength: textFields.description.maxLength}}
          ></TextField>
          <FormHelperText>Symbols: {description.length}/{textFields.description.maxLength}</FormHelperText>
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
  )
}
