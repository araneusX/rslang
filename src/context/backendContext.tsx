import React, { createContext, Dispatch, FunctionComponent } from 'react';
import { AppActions } from './reducers';

const BackendContext = createContext({});

interface ComponentProps {
  dispathFunction?: Dispatch<AppActions>
  children?: React.ReactNode
}

const BackendProvider: FunctionComponent<ComponentProps> = ({ dispathFunction, children }: ComponentProps) => {
  const testHandler = () => true;

  return (
    <BackendContext.Provider value={{ testHandler }}>
      { children }
    </BackendContext.Provider>
  );
};

export { BackendContext, BackendProvider };
