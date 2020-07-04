import { initSettingsObject, initialSpeakitObject, initTrainingObject } from '../constants';
import {
  SettingsInterface, StateInterface, AuthInterface, SpeakitStateInterface, TrainingStateInterface
} from '../types';

const auth: AuthInterface = {
  isAuth: false,
  userId: '',
  token: ''
};

const settings: SettingsInterface = { ...initSettingsObject };

const speakit: SpeakitStateInterface = { ...initialSpeakitObject };

const training: TrainingStateInterface = { ...initTrainingObject };


export default {
  auth,
  settings,
  speakit,
  training
} as StateInterface;
