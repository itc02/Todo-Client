import { ActionTypes, Actions } from './actions';
import { StateType } from './initialState';

const reducer = (state: StateType, action: Actions): StateType => {
  const { selectedTodos, selectedUsers } = state;
  
  switch(action.type) {
    case ActionTypes.ADD_TODO:
      return {
        ...state,
        selectedTodos: [ ...selectedTodos, action.id],
      };
    case ActionTypes.ADD_USER:
      return {
        ...state,
        selectedUsers: [ ...selectedUsers, action.id]
      };
    case ActionTypes.REMOVE_TODO:
      return {
        ...state,
        selectedTodos: selectedTodos.filter((item: number) => item !== action.id),
      };
    case ActionTypes.REMOVE_USER:
      return {
        ...state,
        selectedUsers: selectedUsers.filter((item: number) => item !== action.id)
      };
    case ActionTypes.CLEAR_TODOS:
      return {
        ...state,
        selectedTodos: [],
        isAllTodosSelected: false
      }
    case ActionTypes.CLEAR_USERS:
      return {
        ...state,
        selectedUsers: [],
        isAllUsersSelected: false
      }
    case ActionTypes.SET_ALL_TODOS:
      return {
        ...state,
        selectedTodos: action.arrayOfIds,
        isAllTodosSelected: true
      }
    case ActionTypes.SET_ALL_USERS:
      return {
        ...state,
        selectedUsers: action.arrayOfIds,
        isAllUsersSelected: true
      }
    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

export default reducer;
