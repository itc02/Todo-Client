type StateType = {
  selectedTodos: number[];
  selectedUsers: number[];
  isAllTodosSelected: boolean;
  isAllUsersSelected: boolean;
}

const initialState: StateType = {
  selectedTodos: [],
  selectedUsers: [],
  isAllTodosSelected: false,
  isAllUsersSelected: false
}

export { initialState };
export type { StateType };
