import {
  initSettingsObject,
  initialSpeakitObject,
  initialSprintObject,
  initTrainingObject,
  initialAudioCallObject,
  initialAuthObject,
  initialOurGameObject
} from '../constants';

import {
  SettingsInterface,
  StateInterface,
  AuthInterface,
  SpeakitStateInterface,
  SprintStateInterface,
  TrainingStateInterface,
  AudioCallStateInterface,
  OurGameStateInterface
} from '../types';

const auth: AuthInterface = { ...initialAuthObject };

const settings: SettingsInterface = { ...initSettingsObject };

const speakit: SpeakitStateInterface = { ...initialSpeakitObject };

const sprint: SprintStateInterface = { ...initialSprintObject };

const training: TrainingStateInterface = { ...initTrainingObject };

const audioCall: AudioCallStateInterface = { ...initialAudioCallObject };

const our: OurGameStateInterface = { ...initialOurGameObject };

export default {
  auth,
  settings,
  speakit,
  our,
  sprint,
  training,
  audioCall
} as StateInterface;
