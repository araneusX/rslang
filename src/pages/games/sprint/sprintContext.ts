import { createContext } from 'react';
import { SprintWordInterface } from '../../../types';

const SprintContext = createContext<{
  getStartWords:()=>Promise<SprintWordInterface[]
  >}>(
    {
      getStartWords: async () => []
    });

export default SprintContext;
