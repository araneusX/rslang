import React, { createContext } from 'react';
import {
  logInUser,
  createUser,
  uploadUserStatistics,
  downloadUserStatistics,
  downloadSettings,
  uploadSettings
} from './user';
import statistics from './statistics';

const BackendContext = createContext({});

interface ComponentProps {
  children?: React.ReactNode
}

const BackendProvider: React.FC = ({ children }: ComponentProps) => (
  <BackendContext.Provider value={{
    uploadUserStatistics,
    downloadUserStatistics,
    downloadSettings,
    uploadSettings,
    logInUser,
    createUser,
    statistics
  }}
  >
    { children }
  </BackendContext.Provider>
);

export { BackendProvider, BackendContext };
