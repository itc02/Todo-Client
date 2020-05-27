import React, { useReducer } from "react";
import { initialState } from './initialState';
import reducer from './reducer';
import { StateType } from './initialState';
import { Actions } from './actions';
import { Context } from './useGlobalState';



export const Provider:React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer<React.Reducer<StateType, Actions>>(reducer, initialState);
  return (
    <Context.Provider value={{state, dispatch}}>
      {children}
    </Context.Provider>
  )
}
