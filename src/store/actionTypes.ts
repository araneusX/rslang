import {
  SettingsInterface, AuthInterface, TrainingScreenType, BackendWordInterface
} from '../types';

export type Action =
| { type: 'SET_AUTH', value: AuthInterface }
| { type: 'SET_SETTINGS', value: SettingsInterface }
| { type: 'SET_TRAINING_SCREEN', value: TrainingScreenType }
| { type: 'SET_TRAINING_COMPLETE', value: boolean }
| { type: 'SET_TRAINING_AUDIO', value: boolean }
| { type: 'SET_TRAINING_CARD', value: BackendWordInterface };
