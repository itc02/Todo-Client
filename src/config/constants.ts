export const states = ['new', 'in progress', 'finished'];

export const sortingOrders = {
  orders: ['none', 'ASC', 'DESC'],
  defaultOrder: 'none'
};

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
  default: {
    moment: 'MM/DD/YYYY',
    datePicker: 'MM/dd/yyyy'
  }
};

export const titles = {
  edit: 'Edit',
  add: 'Add',
  todos: {
    main: 'Todos',
    edit: 'Edit todo',
    add: 'Add todo'
  },
  users: {
    add: 'Add user',
    all: 'All users'
  }
}

export const buttons = {
  cancel: 'Cancel',
  delete: 'Delete'
}

export const helpers = {
  symbol: 'Symbols'
}

export const pagination = {
  rowsOnPage: [5, 10, 20],
  defaultPage: 1,
  defaultPer: 5
};


export const sortingCriterias = {
  todos: ['title', 'state', 'user_name', 'deadline'],
  defaultTodoCriteria: 'title'
};

export const columns = {
  todos: ['', 'Title', 'State', 'Assigned to', 'End date'],
  users: ['', 'Name', 'Number of todos']
};

export const filterCriterias = {
  todos: ['title', 'state', 'user_name', 'deadline'],
  users: ['user_name'],
  defaultTodoCriteria: 'title',
  defaultUserCriteria: 'user_name'
};

