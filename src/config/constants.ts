export const columns = ['', 'Title', 'State', 'Assigned to', 'End date'];

export const routes = {
  server: 'http://localhost:3000',
  todos: 'todos',
  users: 'users',
  allUsers: 'all',
  sortTodos: 'sort'
};

export const labels = {
  title: 'New title',
  deadline: 'End date',
  assignTo: 'Assign to',
  description: 'New description',
  user: 'New user',
  email: 'New email',
  state: 'New state'
};

export const states = ['new', 'in progress', 'finished'];

export const dateFormats = {
  default: 'MM/DD/YYYY'
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

export const pagination = {
  rowsOnPage: [5, 10, 20]
};
