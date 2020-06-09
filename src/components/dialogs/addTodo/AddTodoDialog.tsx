import React, { useState, useEffect} from 'react';
import { UsersData } from '../../../utils/interfaces/users';
import { textFields, states } from '../../../utils/staticData/constants';
import { routes, labels } from '../../../utils/staticData/enums';
import { StyledFormControl, CapitalizedSelect, CapitalizedMenuItem } from './styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import { KeyboardDatePicker, MuiPickersUtilsProvider  } from '@material-ui/pickers';
import moment from 'moment';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import { DialogStructure } from '../common/DialogStructure';

interface Props {
  open: boolean;
  closeDialog: () => void;
  createTodo: (data: MainData) => void;
  isEdit: boolean;
  editTodo: (data: MainData) => void;
  id: number
}

interface MainData {
  title: string;
  deadline: Date | null;
  userId: number;
  description: string;
  state?: string;
}

export const AddTodoDialog:React.FC<Props> = ({ open, closeDialog, createTodo, isEdit, editTodo, id }) => {
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

  const isDataInvalid = (): boolean => {
    return (
      !title ||
      !deadline ||
      !userId ||
      !description ||
      !moment(deadline || undefined).isValid()
    );
  }

  const clear = ()  => {
    setTitle('');
    setDescription('');
    setDeadline(null);
    setUserId(0);
  }

  const fill = () => {
    axios.get(`${routes.server}/${routes.todos}`, {
      params: {
        id
      }
    }).then(res => {
      const { title, state, user_id, deadline, description } = res.data;
      setTitle(title);
      setState(state);
      setUserId(user_id);
      setDeadline(deadline);
      setDescription(description);
    });
    
  }

  const close = () => {
    closeDialog();
  }

  const confirm = () => {
    if (!isDataInvalid()) {
      if(!isEdit) {
        const data = { title, deadline, userId, description };
        createTodo(data);
      } else {
        const data = { id, title, deadline, userId, description, state };
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
    axios.get(`${routes.server}/${routes.users}`).then(res => {
      setUsers(res.data.users);
    });
    isEdit ? fill() : clear();
  }, [ isEdit ]);

  return (
    <DialogStructure
      open={open}
      title={`${isEdit ? 'Edit' : 'Add'} todo`}
      action={isEdit ? 'Edit' : 'Add'}
      isInvalid={isDataInvalid()}
      close={close}
      confirm={confirm}
    >
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
              format={'MM/dd/yyyy'}
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
          <FormHelperText>Symbols: {description.length}/{textFields.description.maxLength}</FormHelperText>
        </StyledFormControl>
    </DialogStructure>
  );
}
