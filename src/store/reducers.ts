import { State, appState } from './store';
import { Action } from './actionTypes';

const mainReducer = (state = appState, action:Action): State => {
  switch (action.type) {
    case 'SET_AUTH': {
      const { value } = action;
      return { ...state, auth: { ...state.auth, isAuth: value } };
    }
    case 'SET_TOKEN': {
      const { value } = action;
      return { ...state, auth: { ...state.auth, authToken: value } };
    }
    case 'USER_ID': {
      const { value } = action;
      return { ...state, auth: { ...state.auth, userId: value } };
    }
    case 'SET_SETING': {
      const { value } = action;
      return { ...state, settings: value };
    }
    default: return state;
  }
};

export default mainReducer;
