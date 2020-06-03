import React, { useState, useEffect} from 'react';
import { UsersData } from '../../../utils/interfaces/users';
import { textFields, states, titles, } from '../../../utils/staticData/constants';
import { routes, labels, helpers, buttons, dateFormats } from '../../../utils/staticData/enums';
import { DialogTitle, Transition, StyledFormControl, CapitalizedSelect, CapitalizedMenuItem } from './styles';
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
import { TodosData } from '../../../utils/interfaces/todos';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';

interface Props {
  open: boolean;
  closeDialog: () => void;
  createTodo: (data: MainData) => void;
  isEdit: boolean;
  editTodo: (data: MainData) => void;
  prevData: TodosData;
}

interface MainData {
  title: string;
  deadline: Date | null;
  userId: number;
  description: string;
  state?: string;
}

export const AddTodoDialog:React.FC<Props> = ({ open, closeDialog, createTodo, isEdit, editTodo, prevData }) => {
  const [ isOpen, setOpen ] = useState<boolean>(open);

  const [ users, setUsers ] = useState<UsersData[]>([]);

  const [ title, setTitle ] = useState<string>('');
  const [ userId, setUserId ] = useState<number>(0);
  const [ deadline, setDeadline ] = useState<Date | null>(null);
  const [ description, setDescription ] = useState<string>('');
  const [ state, setState ] = useState<string | undefined>('');

  const handleTitle = (event: any) => {
    setTitle(event.target.value);
  }

  const handleState = (event: any) => {
    setState(event.target.value);
  };

  const handleDeadline = (date: Date | null) => {
    setDeadline(date);
  }

  const handleAssignedTo = (event: any, value: any) => {
    setUserId(parseInt(value));
  }

  const handleDescription = (event: any) => {
    setDescription(event.target.value);
  }

  const isDataValid = () => {
    return title && deadline && userId && description && moment(deadline).isValid();
  }

  const clear = ()  => {
    setTitle('');
    setDescription('');
    setDeadline(null);
    setUserId(0);
  }

  const fill = () => {
    setTitle(prevData.title);
    setState(prevData.state);
    setUserId(prevData.user_id);
    setDeadline(prevData.deadline);
    setDescription(prevData.description);
  }

  const close = () => {
    closeDialog();
  }

  const confirm = () => {
    if (isDataValid()) {
      if(!isEdit) {
        const data = { title, deadline, userId, description };
        createTodo(data);
      } else {
        const data = { id: prevData.id, title, deadline, userId, description, state };
        editTodo(data);
      }
      closeDialog();
    }
  }

  const usersId = () => {
    return [''].concat(users.map(user => user.id.toString()));
  }

  const getOptionLabel = (option: any) => {
    const user = users.find(user => user.id.toString() === option);
    return option && user ? user.user_name : '';
  }

  const renderInput = (params: any) => {
    return (
      <TextField {...params} label={labels.assignTo} value='' variant='outlined'/>
    );
  }
  
  useEffect(() => {
    setOpen(open);
    axios.get(`${routes.server}/${routes.users}`).then(res => {
      setUsers(res.data.users);
    });
    isEdit ? fill() : clear();
  }, [ open, isEdit ]);

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeDialog}
      fullWidth
    >
      <DialogTitle>{isEdit ? titles.todos.edit : titles.todos.add}</DialogTitle>
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
          <FormHelperText>{helpers.symbol}: {title.length}/{textFields.title.maxLength}</FormHelperText>
        </StyledFormControl>
        {isEdit &&
          <StyledFormControl fullWidth variant='outlined'>
            <InputLabel id='selectState'>{labels.state}</InputLabel>
            <CapitalizedSelect 
              required 
              fullWidth 
              value={state}
              onChange={handleState}
              labelId={'selectState'}
              label={labels.state}
            >
            {
              states.map(stateName => {
                return (
                  <CapitalizedMenuItem value={stateName} key={stateName}> { stateName }</CapitalizedMenuItem>
                );
              })
            }
            </CapitalizedSelect>
          </StyledFormControl>
        }
        <FormControl fullWidth>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              inputVariant='outlined'
              variant='inline'
              format={dateFormats.datePicker}
              margin='normal'
              label={labels.deadline}
              value={deadline}
              onChange={handleDeadline}
            />
          </MuiPickersUtilsProvider>
        </FormControl>

        <StyledFormControl fullWidth>
          <Autocomplete
            options={usersId()}
            value={userId === 0 ? '' : userId.toString()}
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
          <FormHelperText>{helpers.symbol}: {description.length}/{textFields.description.maxLength}</FormHelperText>
        </StyledFormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} variant='contained' color='secondary'>
          {buttons.cancel}
        </Button>
        <Button onClick={confirm} variant='contained' color='primary' disabled={!isDataValid()}>
          {isEdit ? titles.edit : titles.add}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
