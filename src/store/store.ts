import {
  initSettingsObject,
  initialSpeakitObject,
  initialSprintObject,
  initTrainingObject
} from '../constants';
import {
  SettingsInterface,
  StateInterface,
  AuthInterface,
  SpeakitStateInterface,
  SprintStateInterface,
  TrainingStateInterface
} from '../types';

const auth: AuthInterface = {
  isAuth: false,
  userId: '',
  token: ''
};

const settings: SettingsInterface = { ...initSettingsObject };

const speakit: SpeakitStateInterface = { ...initialSpeakitObject };

const sprint: SprintStateInterface = { ...initialSprintObject };

const training: TrainingStateInterface = { ...initTrainingObject };

export default {
  auth,
  settings,
  speakit,
  sprint,
  training
} as StateInterface;
