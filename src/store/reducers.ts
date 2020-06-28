import appState from './store';
import { Action } from './actionTypes';
import {
  StateInterface, AuthInterface, SettingsInterface, TrainingStateInterface
} from '../types';

const authReducer = (state: AuthInterface, action:Action): AuthInterface => {
  switch (action.type) {
    case 'SET_AUTH': {
      const { value } = action;
      return value;
    }
    default: return state;
  }
};

const settingsReducer = (state: SettingsInterface, action:Action): SettingsInterface => {
  switch (action.type) {
    case 'SET_SETTINGS': {
      const { value } = action;
      return value;
    }
    default: return state;
  }
};

const trainReducer = (state: TrainingStateInterface, action: Action): TrainingStateInterface => {
  switch (action.type) {
    case 'SET_TRAINING_SCREEN': {
      const { value } = action;
      return { ...state, screen: value };
    }
    case 'SET_TRAINIG_COMPLETE': {
      const { value } = action;
      return { ...state, complete: value };
    }
    case 'SET_TRAINIG_AUDIO': {
      const { value } = action;
      return { ...state, isAudioOn: value };
    }
    default: return state;
  }
};

const mainReducer = (
  { auth, settings, training }: StateInterface,
  action:Action
): StateInterface => ({
  auth: authReducer(auth, action),
  settings: settingsReducer(settings, action),
  training: trainReducer(training, action)
});

export default mainReducer;
