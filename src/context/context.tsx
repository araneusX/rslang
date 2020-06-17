import React, { createContext, useReducer, Dispatch } from 'react';
import { appReducer, AppActions } from './reducers';
import { InitialStateType, initialState } from './state';
import { BackendProvider } from './backendContext';

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
      <BackendProvider dispathFunction={dispatch}>
        { children }
      </BackendProvider>
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
