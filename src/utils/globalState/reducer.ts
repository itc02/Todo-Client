import { ActionTypes, Actions } from './actions';
import { StateType } from './initialState';

const reducer = (state: StateType, action: Actions): StateType => {
  const { selectedTodos, selectedUsers } = state;
  
  switch(action.type) {
    case ActionTypes.ADD_TODO:
      return {
        selectedTodos: [ ...selectedTodos, action.id],
        selectedUsers
      };
    case ActionTypes.ADD_USER:
      return {
        selectedTodos,
        selectedUsers: [ ...selectedUsers, action.id]
      };
    case ActionTypes.REMOVE_TODO:
      return {
        selectedTodos: selectedTodos.filter((item: number) => item !== action.id),
        selectedUsers
      };
    case ActionTypes.REMOVE_USER:
      return {
        selectedTodos,
        selectedUsers: selectedUsers.filter((item: number) => item !== action.id)
      };
    case ActionTypes.CLEAR_TODOS:
      return {
        selectedTodos: [],
        selectedUsers
      }
    case ActionTypes.CLEAR_USERS:
      return {
        selectedTodos,
        selectedUsers: []
      }
    case ActionTypes.SET_ALL_TODOS:
      return {
        selectedTodos: action.arrayOfIds,
        selectedUsers
      }
    case ActionTypes.SET_ALL_USERS:
      return {
        selectedTodos,
        selectedUsers: action.arrayOfIds
      }
    default:
      throw new Error('Unknown action: ' + action);
  }
}

export default reducer;
