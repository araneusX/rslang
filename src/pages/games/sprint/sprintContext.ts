import { createContext } from 'react';
import { SprintWordInterface } from '../../../types';

const SprintContext = createContext<{
  getStartWords:(level?: number, selectLevel?:boolean)=>Promise<SprintWordInterface[]
  >}>(
    {
      getStartWords: async () => []
    });

export default SprintContext;
