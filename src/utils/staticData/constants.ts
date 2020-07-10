export const textFields = {
  title: {
    minLength: 8,
    maxLength: 32
  },
  description: {
    maxLength: 512,
    minLength: 64,
    rows: 8
  },
  user: {
    minLength: 5,
    maxLength: 32
  }
};

export const sortingCriteria = {
  todos: ['title', 'state', 'user_name', 'deadline'],
  defaultTodoCriterion: 'title'
};

export const columns = {
  todos: ['', 'Title', 'State', 'Assigned to', 'End date'],
  users: ['', 'Name', 'Email', 'Assigned todos number']
};

export const filterCriteria = {
  todos: ['title', 'state', 'user_name', 'deadline'],
  users: ['user_name', 'email'],
  defaultTodoCriterion: 'title',
  defaultUserCriterion: 'user_name'
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
