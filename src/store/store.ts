import { initSettingsObject, initTrainingObject } from '../constants';
import { SettingsInterface, StateInterface, AuthInterface, TrainingStateInterface } from '../types';

const auth: AuthInterface = {
  isAuth: false,
  userId: '',
  token: ''
};

const settings: SettingsInterface = { ...initSettingsObject };

const training: TrainingStateInterface = { ...initTrainingObject }

export default {
  auth,
  settings,
  training
} as StateInterface;
