import { initSettingsObject, initialSpeakitObject, initialOurGameObject } from '../constants';
import {
  SettingsInterface, StateInterface, AuthInterface, SpeakitStateInterface, OurGameStateInterface
} from '../types';

const auth: AuthInterface = {
  isAuth: false,
  userId: '',
  token: ''
};

const settings: SettingsInterface = { ...initSettingsObject };

const speakit: SpeakitStateInterface = { ...initialSpeakitObject };

const our: OurGameStateInterface = { ...initialOurGameObject };

export default {
  auth,
  settings,
  speakit,
  our
} as StateInterface;
