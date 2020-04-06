
import React, { useState, useEffect} from 'react';
import { UsersData, GetUsers } from '../../../utils/requests/users';
import { AddTodo } from '../../../utils/requests/todos';
import { states, labels, textFields, dateFormats } from '../../../config/constants';
import { DialogTitle, inputStyle, Transition, capitalize } from './styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import { KeyboardDatePicker, MuiPickersUtilsProvider  } from '@material-ui/pickers';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';

interface Props {
	open: boolean;
	closeDialog: any;
	isEditing: boolean;
	inputedData: any;
}

export const AddTodoDialog = ({ open, closeDialog, isEditing, inputedData }: Props) => {
	const [ isOpen, setOpen ] = useState(open);
	const users: UsersData[] = GetUsers();

	const [ title, setTitle ] = useState<string>('');
	const [ state, setState ] = useState<string>(states.new);
	const [ assignedTo, setAssignedTo ] = useState<string | null>('');
	const [ deadline, setDeadline ] = useState<Date | null>(null);
	const [ description, setDescription ] = useState<string>('');

	const handleTitle = (event: any) => {
		setTitle(event.target.value);
	}

	const handleState = (event: any) => {
		setState(event.target.value);
	};

	const handleDeadline = (date: Date | null) => {
		setDeadline(date);
	}

	const handleAssignedTo = (event: any, value: string | null) => {
		setAssignedTo(value);
	}

	const handleDescription = (event: any) => {
		setDescription(event.target.value);
	}

	const isDataValid = () => {
		if(!title || !deadline || !assignedTo || !description || !moment(deadline).isValid()) {
			return false;
		}

		return true;
	}

	const clear = ()  => {
		setTitle('');
		setDescription('');
		setDeadline(null);
		setState(states.new);
		setAssignedTo('');
	}
	
	const addTodo = () => {
		// @ts-ignore
		const data = {title, deadline, assigned_to: users.find(user => user.user_name === assignedTo).id, description}
		if (isDataValid()) {
			clear();
			AddTodo(data);
			inputedData(data)
			closeDialog();
		}
	}

	useEffect(() => {
		setOpen(open);
	}, [ open ]);

	return (
		<div>
			<Dialog
				open={isOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={closeDialog}
				fullWidth
			>
				<DialogTitle>Add todo</DialogTitle>
				<DialogContent>
					<FormControl fullWidth>
						<TextField 
							value={title}
							label={labels.title} 
							variant='outlined'
							fullWidth 
							style={inputStyle}
							inputProps={{ maxLength: textFields.title.maxLength }}
							onChange={handleTitle}
						></TextField>
						<FormHelperText>Symbols: {title.length}/{textFields.title.maxLength}</FormHelperText>
					</FormControl>

					{isEditing ? 
						<FormControl fullWidth>
							<Select 
								required 
								fullWidth 
								value={state}
								variant='outlined' 
								style={inputStyle}
								onChange={handleState}
							>
								{
									//@ts-ignore
									Object.keys(states).map((key: string) => <MenuItem style={capitalize} value={key} key={key}> { states[key] }</MenuItem>)
								}
							</Select>
						</FormControl>
					: null}

					<FormControl fullWidth>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								style={inputStyle}
								disableToolbar
								inputVariant='outlined'
								variant='inline'
								format='MM/dd/yyyy'
								margin='normal'
								label={labels.deadline}
								value={deadline}
								onChange={handleDeadline}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
						</MuiPickersUtilsProvider>
					</FormControl>

					<FormControl fullWidth>
						<Autocomplete
							style={inputStyle}
							options={users.map(user => user.user_name)}
							onChange={handleAssignedTo}
							getOptionLabel={option => option}
							renderInput={(params: any) => {
								return <TextField {...params} label={labels.assignTo} variant='outlined'/>
							}}
						/>
					</FormControl>

					<FormControl fullWidth>
						<TextField 
							value={description}
							variant='outlined'
							label={labels.description} 
							fullWidth 
							multiline 
							rows={textFields.description.rows} 
							style={inputStyle}
							onChange={handleDescription}
							inputProps={{ maxLength: textFields.description.maxLength}}
						>
						</TextField>
						<FormHelperText>Symbols: {description.length}/{textFields.description.maxLength}</FormHelperText>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeDialog} variant='contained' color='secondary'>
						Cancel
					</Button>
					<Button onClick={addTodo} variant='contained' color='primary' disabled={!isDataValid()}>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}