import { initSettingsObject } from '../constants';
import { SettingsInterface, StateInterface, AuthInterface } from '../types';

const auth: AuthInterface = {
  isAuth: false,
  userId: '',
  token: ''
};

const settings: SettingsInterface = { ...initSettingsObject };

export default {
  auth,
  settings
} as StateInterface;
