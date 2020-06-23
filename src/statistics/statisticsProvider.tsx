import React, { createContext } from 'react';
import statistics from './statistics';

interface ContextType {
  [key: string]: any
}

const initialObj = {} as ContextType;

const StatisticsContext = createContext(initialObj);

interface ComponentProps {
  children?: React.ReactNode
}

const StatisticsProvider: React.FC = ({ children }: ComponentProps) => (
  <StatisticsContext.Provider value={statistics}>
    { children }
  </StatisticsContext.Provider>
);

export { StatisticsProvider, StatisticsContext };
