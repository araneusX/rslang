import appState from './store';
import { Action } from './actionTypes';
import { StateInterface } from '../types';

const mainReducer = (state = appState, action:Action): StateInterface => {
  switch (action.type) {
    case 'SET_AUTH': {
      const { value } = action;
      return { ...state, auth: value };
    }
    case 'SET_SETTINGS': {
      const { value } = action;
      return { ...state, settings: value };
    }
    default: return state;
  }
};

export default mainReducer;
