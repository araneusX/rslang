import React, { createContext } from 'react';
import { uploadStatistics, downloadStatistics } from './statistics';
import { downloadSettings, uploadSettings } from './settings';
import { logInUser, createUser } from './user';

const BackendContext = createContext({});

interface ComponentProps {
  children?: React.ReactNode
}

const BackendProvider: React.FC = ({ children }: ComponentProps) => (
  <BackendContext.Provider value={{
    uploadStatistics,
    downloadStatistics,
    downloadSettings,
    uploadSettings,
    logInUser,
    createUser
  }}
  >
    { children }
  </BackendContext.Provider>
);

export { BackendProvider, BackendContext };
