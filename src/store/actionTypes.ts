import {
  SettingsInterface, AuthInterface, SpeakitWordInterface, SpeakitScreenType, SpeakitModeType, OurGameWordInterface
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
| { type: 'SET_OUR_ROUND', value: number}
| { type: 'SET_OUR_LEVEL', value: number}
| { type: 'SET_OUR_WORDS', value: OurGameWordInterface[]}
| { type: 'SET_OUR_SCREEN', value: SpeakitScreenType}
| { type: 'SET_OUR_COMPLETE', value: boolean}
| { type: 'SET_OUR_MODE', value: SpeakitModeType}
| { type: 'SET_OUR_GAME', value: boolean};
