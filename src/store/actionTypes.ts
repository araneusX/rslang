import {
  SettingsInterface, AuthInterface, SpeakitWordInterface, SpeakitScreenType, SpeakitModeType, SprintWordInterface, SprintScreenType, PointsLevelRange
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
| { type: 'SET_SPRINT_LEVEL', value: {level: number, words: SprintWordInterface[]} }
| { type: 'SET_SPRINT_START_GAME'}
| { type: 'SET_SPRINT_SCREEN', value: SprintScreenType}
| { type: 'SET_SPRINT_POINTS_LEVEL', value: PointsLevelRange}
| { type: 'SET_SPRINT_ROUND_TIME', value: number}
| { type: 'SET_SPRINT_WORDS', value: SprintWordInterface[]};
