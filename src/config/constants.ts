export const routes = {
  serverURL: 'http://localhost:3000',
  states: 'states',
  todos: 'todos',
  users: 'users',
  deleteAllTodos: 'todos/delete_all',
  getOwners: 'todos/get_owners'
};

export const angularComponent = {
  selector: {
    app: 'app-root',
    mainTable: 'app-main-table',
  },
  templateUrl: {
    app: './app.component.html',
    mainTable: './main-table.component.html',
    dialogDelete: './dialog-delete.component.html',
    dialogEdit: './dialog-edit.component.html',
    dialogAddUser: './dialog-add-user.component.html',
    dialogShowUsers: './dialog-show-users.component.html'
  },
  styleUrls: {
    app: ['./app.component.css'],
    mainTable: ['./main-table.component.css'],
    dialogDelete: ['dialog-delete.component.css'],
    dialogEdit: ['./dialog-edit.component.css'],
    dialogAddUser: ['./dialog-add-user.component.css'],
    dialogShowUsers: ['./dialog-show-users.component.css']
  }
};

export const snack = {
  duration: 4000,
  cancel: 'Cancel',
  undo: 'Undo',
  verticalPosition: 'top',
  horizontalPosition: 'right',
  todo: {
    add: 'Todo was added successfully',
    delete: 'Todo was deleted successfully',
    edit: 'Todo was edited successfully'
  },
  user: {
    add: 'User was added successfully',
    delete: 'User was deleted successfully',
    exist: 'User already exists',
    owner: 'You chose user(s) that have todo(s)'
  }
};

export const dialog = {
  deleteTodo: {
    width: '300px'
  },
  addUser: {
    width: '300px'
  },
  openUsers: {
    width: '500px',
    height: '650px'
  },
  editUsers: {
    deletedUserSign: '--'
  }
};

export const verification = {
  title: {
    length: 32
  },
  description: {
    length: 256,
    rows: 8
  }
};

export const editDialog = {
  width: '500px',
  editTitle: 'Edit todo',
  editOkText: 'Edit',
  addTitle: 'Add todo',
  addOkText: 'Add'
}