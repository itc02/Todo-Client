export enum ActionTypes {
  ADD_TODO = 'ADD_TODO',
  ADD_USER = 'ADD_USER',
  REMOVE_TODO = 'REMOVE_TODO',
  REMOVE_USER = 'REMOVE_USER',
  CLEAR_TODOS = 'CLEAR_TODOS',
  CLEAR_USERS = 'CLEAR_USERS',
  SET_ALL_TODOS = 'SET_ALL_TODOS',
  SET_ALL_USERS = 'SET_ALL_USERS'
}

type Actions =
| { type: ActionTypes.ADD_TODO; id: number }
| { type: ActionTypes.ADD_USER; id: number }
| { type: ActionTypes.REMOVE_TODO; id: number}
| { type: ActionTypes.REMOVE_USER; id: number}
| { type: ActionTypes.CLEAR_TODOS }
| { type: ActionTypes.CLEAR_USERS }
| { type: ActionTypes.SET_ALL_TODOS; arrayOfIds: number[] }
| { type: ActionTypes.SET_ALL_USERS; arrayOfIds: number[] }

export type { Actions };
