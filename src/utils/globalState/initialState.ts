type StateType = {
  selectedTodos: number[];
  selectedUsers: number[];
}

const initialState: StateType = {
  selectedTodos: [],
  selectedUsers: []
}

export { initialState };
export type { StateType };
