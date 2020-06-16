import React, { createContext, useReducer, Dispatch } from 'react';
import { appReducer, AppActions } from './reducers';
import { InitialStateType, initialState } from './state';

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<AppActions>
}>({
  state: initialState,
  dispatch: () => null
});

interface ComponentProps {
  children?: React.ReactNode
}

const AppProvider: React.FC = ({ children }:ComponentProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      { children }
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
