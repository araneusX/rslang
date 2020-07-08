import { initSettingsObject, initialSpeakitObject, initialSprintObject } from '../constants';
import {
  SettingsInterface, StateInterface, AuthInterface, SpeakitStateInterface, SprintStateInterface
} from '../types';

const auth: AuthInterface = {
  isAuth: false,
  userId: '',
  token: ''
};

const settings: SettingsInterface = { ...initSettingsObject };

const speakit: SpeakitStateInterface = { ...initialSpeakitObject };

const sprint: SprintStateInterface = { ...initialSprintObject };

export default {
  auth,
  settings,
  speakit,
  sprint
} as StateInterface;
