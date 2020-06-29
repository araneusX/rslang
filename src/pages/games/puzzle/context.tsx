import React, { useReducer } from 'react';

const initPuzzle: any = {
  level: '0',
  page: '0',
  screen: 'start-page'
};

function reducer(state: any, action: any) {
  console.log('from reducer:', action, 'state:', state);
  switch (action.type) {
    case 'level':
      return { ...state, level: action.value };
    case 'page':
      return { ...state, page: action.value };
    case 'screen':
      return { ...state, screen: action.value };
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
