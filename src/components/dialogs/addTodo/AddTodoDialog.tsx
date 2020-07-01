import React, { useState, useEffect } from 'react';
import { UsersData } from '../../../utils/interfaces/users';
import { textFields, states } from '../../../utils/staticData/constants';
import { routes, labels } from '../../../utils/staticData/enums';
import { StyledFormControl, CapitalizedSelect, CapitalizedMenuItem } from './styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import { KeyboardDatePicker, MuiPickersUtilsProvider  } from '@material-ui/pickers';
import moment from 'moment';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import { DialogStructure } from '../common/DialogStructure';
import DialogActions from '../common/DialogActions';
import { Formik, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';

interface Props {
  open: boolean;
  closeDialog: () => void;
  createTodo: (data: FormData) => void;
  isEdit: boolean;
  editTodo: (data: FormData) => void;
  id: number
}

interface FormData {
  id?: number;
  title: string;
  deadline: Date | null;
  username?: string;
  userId?: number;
  description: string;
  state?: string;
}

export const AddTodoDialog:React.FC<Props> = ({ open, closeDialog, createTodo, isEdit, editTodo, id }) => {
  const [ users, setUsers ] = useState<UsersData[]>([]);
  const initialValues: FormData = {
    title: '',
    state: '',
    deadline: null,
    username: '',
    description: ''
  };

  const NewTodoSchema = Yup.object().shape({
    title: Yup.string()
      .min(textFields.title.minLength, `Minimum: ${textFields.title.minLength} sybmols`)
      .max(textFields.title.maxLength, `Maximum: ${textFields.title.maxLength} sybmols`)
      .required('TItle is required'),
    deadline: Yup.date()
      .min(moment().format(), `Minimum: ${moment().format('DD/MM/YYYY')}`)
      .required('End date is required')
      .nullable(),
    username: Yup.string()
      .test('availableUsername', 'No user found', name => name !== users.map(user => user.user_name).includes(name))
      .required('Username is required'),
    description: Yup.string()
      .min(textFields.description.minLength, `Minimum: ${textFields.description.minLength} symbols`)
      .max(textFields.description.maxLength, `Maximum: ${textFields.description.maxLength} symbols`)
      .required('Description is required'),
    state: isEdit ? Yup.string()
      .test('availableState', 'Invalid state', state => states.includes(state))
      .required('State is required') : Yup.string()
  });

  const usernames = () => {
    return users.map(user => user.user_name);
  }

  const getOptionLabel = (option: any) => {
    const user = users.find(user => user.user_name === option);
    return option && user ? user.user_name : '';
  }
  
  const confirm = (data: FormData) => {
    const user = users.find(user => user.user_name === data.username);
    if(!isEdit) {
      const { title, deadline, description } = data
      createTodo({ title, deadline, userId: user ? user.id : 0, description });
    } else {
      const { title, deadline, description, state } = data;
      editTodo({ id, title, deadline, userId: user ? user.id : 0, description, state });
    }
    closeDialog();
  }

  const fill = (setValues: (values: FormData) => void) => {
    axios.get(`${routes.server}/${routes.todos}`, {
      params: { id }
    }).then(res => {
      const { title, state, user_id, description, deadline } = res.data
      const user = users.find(user => user.id === user_id);
      setValues({
        title,
        deadline,
        state,
        description,
        username: user ? user.user_name : ''
      });
    });
  }

  const clear = (
    setValues: (values: FormData) => void,
    setTouched: (touched: FormikTouched<FormData>) => void,
  ) => {
    setValues(initialValues);
    setTouched({});
  }

  const isFill = (values: FormData) => {
    return isEdit && open && Object.values(values).filter(value => !value).length === Object.keys(values).length;
  }

  const isClear = (values: FormData) => {
    return !open && (Object.values(values).filter(value => value).length > 0);
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

  return (
    <DialogStructure
      open={open}
      title={`${isEdit ? 'Edit' : 'Add'} todo`}
      close={closeDialog}
      isForm={true}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={confirm}
        validationSchema={NewTodoSchema}
        enableReinitialize={true}
      >
        {({values, errors, touched, handleChange, handleSubmit, setFieldValue, setValues, setTouched}) => (
          
          <form onSubmit={handleSubmit}>
            {isClear(values) ? clear(setValues, setTouched) : null}
            {isFill(values) ? fill(setValues) : null}
            <StyledFormControl fullWidth>
              <TextField
                name='title'
                value={values.title}
                label={labels.title}
                variant='outlined'
                fullWidth
                inputProps={{ maxLength: textFields.title.maxLength }}
                onChange={handleChange}
                error={(errors.title && touched.title) ? true : false}
              />
              {(errors.title && touched.title) ? <FormHelperText error={true}>{errors.title}</FormHelperText> : null }
            </StyledFormControl>
            {isEdit &&
              <StyledFormControl fullWidth variant='outlined' error={(errors.state && touched.state) ? true : false}>
                <InputLabel id='selectState'>{labels.state}</InputLabel>
                <CapitalizedSelect 
                  fullWidth 
                  value={values.state}
                  name='state'
                  onChange={handleChange}
                  labelId={'selectState'}
                  label={labels.state}
                >
                {
                  states.map(state => {
                    return (
                      <CapitalizedMenuItem value={state} key={state}>{ state }</CapitalizedMenuItem>
                    );
                  })
                }
                </CapitalizedSelect>
                {(errors.state && touched.state) ? <FormHelperText error={true} style={{marginLeft: 0}}>{errors.state}</FormHelperText> : null }
              </StyledFormControl>
            }
            <StyledFormControl fullWidth>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  inputVariant='outlined'
                  variant='inline'
                  format={'dd/MM/yyyy'}
                  margin='none'
                  label={labels.deadline}
                  value={values.deadline}
                  onChange={(date: Date | null) => setFieldValue('deadline', date)}
                  error={(errors.deadline && touched.deadline) ? true : false}
                />
              </MuiPickersUtilsProvider>
              {(errors.deadline && touched.deadline) ? <FormHelperText error={true}>{errors.deadline}</FormHelperText> : null }
            </StyledFormControl>
      
            <StyledFormControl fullWidth>
              <Autocomplete
                options={usernames()}
                value={!values.username ? null : values.username}
                onChange={(_e: any, value: string | null) => setFieldValue('username', value || '')}
                getOptionLabel={getOptionLabel}
                renderInput={(params: any) => {
                  return (
                    <TextField 
                      {...params} 
                      label={labels.assignTo} 
                      variant='outlined'
                      error={(errors.username && touched.username) ? true : false}
                    />
                  )
                }}
              />
              {(errors.username && touched.username) ? <FormHelperText error={true}>{errors.username}</FormHelperText> : null }
            </StyledFormControl>
      
            <StyledFormControl fullWidth>
              <TextField
                value={values.description}
                name='description'
                variant='outlined'
                label={labels.description}
                fullWidth
                multiline
                rows={textFields.description.rows}
                onChange={handleChange}
                inputProps={{ maxLength: textFields.description.maxLength}}
                error={(errors.description && touched.description) ? true : false}
              />
              {(errors.description && touched.description) ? <FormHelperText error={true}>{errors.description}</FormHelperText> : null }
            </StyledFormControl>

            <DialogActions 
              action='Add'
              close={closeDialog}
              isForm={true}
              isInvalid={Object.values(values).filter(value => value).length === 0}
            />
          </form>
        )}
      </Formik>
    </DialogStructure>
  );
}
