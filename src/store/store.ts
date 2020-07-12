import {
  initSettingsObject,
  initialSpeakitObject,
  initialSprintObject,
  initTrainingObject,
  initialAudioCallObject,
  initialAuthObject
} from '../constants';

import {
  SettingsInterface,
  StateInterface,
  AuthInterface,
  SpeakitStateInterface,
  SprintStateInterface,
  TrainingStateInterface,
  AudioCallStateInterface
} from '../types';

const auth: AuthInterface = { ...initialAuthObject };

const settings: SettingsInterface = { ...initSettingsObject };

const speakit: SpeakitStateInterface = { ...initialSpeakitObject };

const sprint: SprintStateInterface = { ...initialSprintObject };

const training: TrainingStateInterface = { ...initTrainingObject };

const audioCall: AudioCallStateInterface = { ...initialAudioCallObject };

export default {
  auth,
  settings,
  speakit,
  sprint,
  training,
  audioCall
} as StateInterface;
