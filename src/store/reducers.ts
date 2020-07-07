import appState from './store';
import { Action } from './actionTypes';
import {
  StateInterface, AuthInterface, SettingsInterface, SpeakitStateInterface, OurGameStateInterface, PreloaderInterface
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

const preloaderReducer = (state: PreloaderInterface, action: Action): PreloaderInterface => {
  switch (action.type) {
    case 'SET_LOADING': {
      const { value } = action;
      return { ...state, isLoading: value };
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

const ourGameReducer = (state: OurGameStateInterface, action:Action): OurGameStateInterface => {
  switch (action.type) {
    case 'SET_OUR_ROUND': {
      const { value } = action;
      return { ...state, round: value };
    }
    case 'SET_OUR_LEVEL': {
      const { value } = action;
      return { ...state, level: value };
    }
    case 'SET_OUR_WORDS': {
      const { value } = action;
      return { ...state, words: value };
    }
    case 'SET_OUR_SCREEN': {
      const { value } = action;
      return { ...state, screen: value };
    }
    case 'SET_OUR_COMPLETE': {
      const { value } = action;
      return { ...state, complete: value };
    }
    case 'SET_OUR_GAME': {
      const { value } = action;
      return { ...state, game: value };
    }
    case 'SET_OUR_MODE': {
      const { value } = action;
      return { ...state, mode: value };
    }
    default: return state;
  }
};

const mainReducer = (
  {
    auth, settings, speakit, our, preloader
  }: StateInterface,
  action:Action
): StateInterface => ({
  auth: authReducer(auth, action),
  settings: settingsReducer(settings, action),
  speakit: speakItReducer(speakit, action),
  our: ourGameReducer(our, action),
  preloader: preloaderReducer(preloader, action)
});

export default mainReducer;
