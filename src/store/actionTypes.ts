import {
  SettingsInterface, AuthInterface, SpeakitWordInterface, SpeakitScreenType, SpeakitModeType, TrainingScreenType, BackendWordInterface
} from '../types';

export type Action =
| { type: 'SET_AUTH', value: AuthInterface }
| { type: 'SET_SETTINGS', value: SettingsInterface }
| { type: 'SET_SPEAKIT_ROUND', value: number}
| { type: 'SET_SPEAKIT_LEVEL', value: number}
| { type: 'SET_SPEAKIT_WORDS', value: SpeakitWordInterface[]}
| { type: 'SET_SPEAKIT_SCREEN', value: SpeakitScreenType}
| { type: 'SET_SPEAKIT_COMPLETE', value: boolean}
| { type: 'SET_SPEAKIT_MODE', value: SpeakitModeType}
| { type: 'SET_SPEAKIT_GAME', value: boolean}
| { type: 'SET_TRAINING_SCREEN', value: TrainingScreenType }
| { type: 'SET_TRAINING_COMPLETE', value: boolean }
| { type: 'SET_TRAINING_AUDIO', value: boolean }
| { type: 'SET_TRAINING_CARD', value: BackendWordInterface }
| { type: 'SET_TRAINING_FIRST_VISIT', value: boolean }
| { type: 'SET_TRAINING_MODE', value: string }
| { type: 'SET_TRAINING_CARD_DELETE', value: boolean};
