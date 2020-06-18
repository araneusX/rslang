import React, { createContext, useReducer, Dispatch } from 'react';
import mainReducer from './reducers';
import { Action } from './actionTypes';
import { State, appState } from './store';

const StateContext = createContext<{
  state: State;
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
