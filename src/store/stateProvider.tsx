import React, { createContext, useReducer, Dispatch } from 'react';
import mainReducer from './reducers';
import { Action } from './actionTypes';
import appState from './store';
import { StateInterface } from '../types';

const StateContext = createContext<{
  state: StateInterface;
  dispatch: Dispatch<Action>
}>({
  state: appState,
  dispatch: () => null
});

interface ComponentProps {
  children?: React.ReactNode
}

const StateProvider: React.FC = ({ children }:ComponentProps) => {
  const [state, dispatch] = useReducer(mainReducer, appState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      { children }
    </StateContext.Provider>
  );
};

export { StateProvider, StateContext };
