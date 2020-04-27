export const columns = ['', 'Title', 'State', 'Assigned to', 'End date'];

export const routes = {
  server: 'http://localhost:3000',
  todos: 'todos',
  users: 'users'
};

export const labels = {
  title: 'New title',
  deadline: 'End date',
  assignTo: 'Assign to',
  description: 'New description',
  user: 'New user'
};

export const states = {
  new: 'new',
  inProgress: 'in progress',
  finished: 'finished'
};

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
  rowsOnPage: [5, 10, 20],
  rowHeight: 53
};
