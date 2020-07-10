import {
  initSettingsObject, initialSpeakitObject, initialSprintObject, initialAudioCallObject
} from '../constants';
import {
  SettingsInterface, StateInterface, AuthInterface, SpeakitStateInterface, SprintStateInterface, AudioCallStateInterface
} from '../types';

const auth: AuthInterface = {
  isAuth: false,
  userId: '',
  token: ''
};

const settings: SettingsInterface = { ...initSettingsObject };

const speakit: SpeakitStateInterface = { ...initialSpeakitObject };

const sprint: SprintStateInterface = { ...initialSprintObject };

const audioCall: AudioCallStateInterface = { ...initialAudioCallObject };

export default {
  auth,
  settings,
  speakit,
  sprint,
  audioCall
} as StateInterface;
