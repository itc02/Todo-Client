import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { StyledFormControl } from '../addTodo/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import { textFields } from '../../../utils/staticData/constants';
import { routes, labels } from '../../../utils/staticData/enums';
import { UsersData } from '../../../utils/interfaces/users';
import { DialogStructure } from '../common/DialogStructure';
import axios from 'axios';
import { Formik } from 'formik';
import DialogActions from '../common/DialogActions';
import * as Yup from 'yup';

interface Props {
  open: boolean;
  closeDialog: () => void;
}

interface FormData {
  name: string;
  email: string;
}

export const AddUserDialog:React.FC<Props> = ({ open, closeDialog }) => {
  const [ users, setUsers ] = useState<string[]>([]);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string()
      .min(textFields.user.minLength, `Minimum: ${textFields.user.minLength} symbols`)
      .max(textFields.user.maxLength, `Maximum: ${textFields.user.maxLength} symbols`)
      .test('isTaken', 'This username is already taken', name => !users.includes(name))
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required')
  });

  const confirm = (values: FormData) => {
    axios.post(`${routes.server}/${routes.users}`, {
      user_name: values.name,
      email: values.email
    });
  }

  useEffect(() => {
    axios.get(`${routes.server}/${routes.users}`, {
      params: {
        without_pagination: true
      }
    }).then(res => {
      setUsers(res.data.map((user: any) => user.user_name));
    });
  }, [ open ]);

  return(
    <DialogStructure
      open={open}
      title='Add user'
      close={closeDialog}
      isForm={true}
    >
      <Formik
        initialValues={{name: '', email: ''}}
        onSubmit={confirm}
        validationSchema={NewUserSchema}
      >
        {({values, errors, touched, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <StyledFormControl fullWidth>
              <TextField
                type='text'
                name='name'
                value={values.name}
                label={labels.user}
                variant='outlined'
                fullWidth
                inputProps={{ maxLength: textFields.user.maxLength }}
                onChange={handleChange}
                error={(errors.name && touched.name) ? true : false}
              />
              {(errors.name && touched.name) ? <FormHelperText error={true}>{errors.name}</FormHelperText> : null }
            </StyledFormControl>
            
            <StyledFormControl fullWidth>
              <TextField
                type='email'
                name='email'
                value={values.email}
                label={labels.email}
                variant='outlined'
                fullWidth
                onChange={handleChange}
                error={(errors.email && touched.email) ? true : false}
              />
              {(errors.email && touched.email) ? <FormHelperText error={true}>{errors.email}</FormHelperText> : null }
            </StyledFormControl>
            <DialogActions 
              close={closeDialog}
              action='Add'
              isForm={true}
            />
          </form>
        )}
      </Formik>
    </DialogStructure>
  );
}
