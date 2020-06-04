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

export const states = ['new', 'in progress', 'finished'];

export const sortingOrders = {
  orders: ['none', 'ASC', 'DESC'],
  defaultOrder: 'none'
}

export const pagination = {
  rowsOnPage: [5, 10, 20],
  defaultPage: 1,
  defaultPer: 5
};
