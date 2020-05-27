import React, { createContext, useContext } from "react";
import { StateType } from './initialState';
import { Actions } from './actions';

interface IContextProps {
  state: StateType;
  dispatch: React.Dispatch<Actions>;
}

export const Context = createContext({} as IContextProps);

export const useGlobalState = () => {
  return useContext(Context);
}
