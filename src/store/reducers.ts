import appState from './store';
import { Action } from './actionTypes';
import {
  StateInterface, AuthInterface, SettingsInterface, SpeakitStateInterface, TrainingStateInterface
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

const speakItReducer = (state: SpeakitStateInterface, action:Action): SpeakitStateInterface => {
  switch (action.type) {
    case 'SET_SPEAKIT_ROUND': {
      const { value } = action;
      return { ...state, round: value };
    }
    case 'SET_SPEAKIT_LEVEL': {
      const { value } = action;
      return { ...state, level: value };
    }
    case 'SET_SPEAKIT_WORDS': {
      const { value } = action;
      return { ...state, words: value };
    }
    case 'SET_SPEAKIT_SCREEN': {
      const { value } = action;
      return { ...state, screen: value };
    }
    case 'SET_SPEAKIT_COMPLETE': {
      const { value } = action;
      return { ...state, complete: value };
    }
    case 'SET_SPEAKIT_GAME': {
      const { value } = action;
      return { ...state, game: value };
    }
    case 'SET_SPEAKIT_MODE': {
      const { value } = action;
      return { ...state, mode: value };
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
    case 'SET_TRAINING_COMPLETE': {
      const { value } = action;
      return { ...state, complete: value };
    }
    case 'SET_TRAINING_AUDIO': {
      const { value } = action;
      return { ...state, isAudioOn: value };
    }
    case 'SET_TRAINING_CARD': {
      const { value } = action;
      return { ...state, card: value };
    }
    case 'SET_TRAINING_FIRST_VISIT': {
      const { value } = action;
      return { ...state, isFirstVisit: value};
    }
    case 'SET_TRAINING_MODE': {
      const { value } = action;
      return { ...state, trainingMode: value};
    }
    default: return state;
  }
};


const mainReducer = (
  { auth, settings, speakit, training }: StateInterface,
  action:Action
): StateInterface => ({
  auth: authReducer(auth, action),
  settings: settingsReducer(settings, action),
  speakit: speakItReducer(speakit, action),
  training: trainReducer(training, action)
});

export default mainReducer;
