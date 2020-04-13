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
  description: 'New description'
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
    maxLength: 16
  },
  description: {
    maxLength: 256,
    rows: 8
  }
};

export const pagination = {
  rowsOnPage: [5, 10, 20],
  rowHeight: 53
};
