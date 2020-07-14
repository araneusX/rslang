import { createContext } from 'react';
import { SprintWordInterface } from '../../../types';

const AudioContext = createContext<{
  getStartWords:(level?: number, selectLevel?:boolean, round?:number)=>Promise<SprintWordInterface[]
  >}>(
    {
      getStartWords: async () => []
    });

export default AudioContext;
