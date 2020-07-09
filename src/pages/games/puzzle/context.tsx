import React, { useReducer } from 'react';

const initPuzzle: any = {
  level: '0',
  page: '0',
  asyncInterval: {},
  asyncLevel: {},
  isInterval: false,
  isLevel: true,
  screen: 'start-page',
  mode: 'image and words'
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'set is interval':
      return { ...state, isInterval: action.value };
    case 'set is level':
      return { ...state, isLevel: action.value };
    case 'set asyncInterval':
      return { ...state, asyncInterval: action.value };
    case 'set asyncLevel':
      return { ...state, asyncLevel: action.value };
    case 'set level':
      return { ...state, level: action.value };
    case 'set page':
      return { ...state, page: action.value };
    case 'set screen':
      return { ...state, screen: action.value };
    case 'set mode':
      return { ...state, mode: action.value };
    case 'set data':
      return { ...state, data: action.value };
    case 'set start':
      return { ...state, isStart: action.value };
    case 'set knowledge':
      return { ...state, knowledge: action.value };
    case 'set gameDOM':
      return { ...state, gameDOM: action.value };
    default:
      return state;
  }
}

interface ComponentProps {
  children?: React.ReactNode
}

const PuzzleContext = React.createContext(initPuzzle);

const PuzzleContextProvider: React.FC = ({ children }: ComponentProps) => {
  const [state, dispatch] = useReducer(reducer, initPuzzle);

  return (
    <PuzzleContext.Provider value={{ state, dispatch }}>
      { children }
    </PuzzleContext.Provider>
  );
};

export { PuzzleContext, PuzzleContextProvider };
