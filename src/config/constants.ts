export const routes = {
  server: 'http://localhost:3000',
  todos: 'todos',
  users: 'users'
};

export const textFields = {
  title: {
    maxLength: 32
  },
  description: {
    maxLength: 512,
    rows: 8
  },
  user: {
    maxLength: 32
  }
};

export const labels = {
  title: 'New title',
  deadline: 'End date',
  assignTo: 'Assign to',
  description: 'New description',
  user: 'New user',
  email: 'New email',
  filter: 'Filter by: ',
  state: 'New state'
};

export const dateFormats = {
  default: 'MM/DD/YYYY'
};

export const pagination = {
  rowsOnPage: [5, 10, 20]
};

export const states = ['new', 'in progress', 'finished'];

export const orders = ['none', 'ASC', 'DESC'];

export const sortingCriterias = ['title', 'state', 'user_name', 'deadline'];

export const columns = {
  todos: ['', 'Title', 'State', 'Assigned to', 'End date'],
  users: ['', 'Name', 'Number of todos']
};

export const filterCriterias = {
  todos: ['title', 'state', 'user_name', 'deadline'],
  users: ['user_name']
};

