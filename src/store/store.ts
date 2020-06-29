import { initSettingsObject, initialSpeakitObject } from '../constants';
import {
  SettingsInterface, StateInterface, AuthInterface, SpeakitStateInterface
} from '../types';

const auth: AuthInterface = {
  isAuth: false,
  userId: '',
  token: ''
};

const settings: SettingsInterface = { ...initSettingsObject };

const speakit: SpeakitStateInterface = { ...initialSpeakitObject };

export default {
  auth,
  settings,
  speakit
} as StateInterface;
