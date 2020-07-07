import {
  initSettingsObject, initialSpeakitObject, initialSprintObject, initialOurGameObject, initLoadingObject
} from '../constants';

import {
  SettingsInterface, StateInterface, AuthInterface, SpeakitStateInterface, OurGameStateInterface, PreloaderInterface, SprintStateInterface
} from '../types';

const auth: AuthInterface = {
  isAuth: false,
  userId: '',
  token: ''
};

const preloader: PreloaderInterface = { ...initLoadingObject };

const settings: SettingsInterface = { ...initSettingsObject };

const speakit: SpeakitStateInterface = { ...initialSpeakitObject };

const sprint: SprintStateInterface = { ...initialSprintObject };
const our: OurGameStateInterface = { ...initialOurGameObject };

export default {
  auth,
  preloader,
  settings,
  speakit,
  sprint,
  our
} as StateInterface;
