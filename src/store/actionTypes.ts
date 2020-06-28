import { SettingsInterface, AuthInterface, TrainingScreenType } from '../types';

export type Action =
| { type: 'SET_AUTH', value: AuthInterface }
| { type: 'SET_SETTINGS', value: SettingsInterface }
| { type: 'SET_TRAINING_SCREEN', value: TrainingScreenType }
| { type: 'SET_TRAINIG_COMPLETE', value: boolean }
| { type: 'SET_TRAINIG_AUDIO', value: boolean };
