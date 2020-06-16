import React, { createContext, useReducer, Dispatch } from 'react';
import { appReducer, AppActions } from './reducers';

type AppType = {
  appState: string;
};

type InitialStateType = {
  app: AppType[];
};

const initialState = {
  app: []
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<AppActions>
}>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = ({ app } : InitialStateType, action: AppActions) => ({
  app: appReducer(app, action)
});

// eslint-disable-next-line react/prop-types
const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      { children }
    </AppContext.Provider>
  );
};

export default { AppContext, AppProvider };
