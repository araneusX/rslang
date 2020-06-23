import { SettingsInterface, AuthInterface } from '../types';

export type Action =
| { type: 'SET_AUTH', value: AuthInterface }
| { type: 'SET_SETTINGS', value: SettingsInterface };
