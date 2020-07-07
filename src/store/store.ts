import {
  initSettingsObject, initialSpeakitObject, initialOurGameObject, initLoadingObject
} from '../constants';
import {
  SettingsInterface, StateInterface, AuthInterface, SpeakitStateInterface, OurGameStateInterface, PreloaderInterface
} from '../types';

const auth: AuthInterface = {
  isAuth: false,
  userId: '',
  token: ''
};

const preloader: PreloaderInterface = { ...initLoadingObject };

const settings: SettingsInterface = { ...initSettingsObject };

const speakit: SpeakitStateInterface = { ...initialSpeakitObject };

const our: OurGameStateInterface = { ...initialOurGameObject };

export default {
  auth,
  preloader,
  settings,
  speakit,
  our
} as StateInterface;
