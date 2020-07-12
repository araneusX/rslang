import React, { createContext } from 'react';
import {
  logInUser,
  createUser
} from './user';

import { getWords } from './words';

import statistics from '../statistics/statistics';

interface ContextType {
  [key: string]: any
}

const initialObj = {} as ContextType;

const BackendContext = createContext(initialObj);

interface ComponentProps {
  children?: React.ReactNode
}

const BackendProvider: React.FC = ({ children }: ComponentProps) => (
  <BackendContext.Provider value={{
    logInUser,
    getWords,
    createUser,
    statistics
  }}
  >
    { children }
  </BackendContext.Provider>
);

export { BackendProvider, BackendContext };
