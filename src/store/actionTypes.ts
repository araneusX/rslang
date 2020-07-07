import {
  SettingsInterface, AuthInterface, SpeakitWordInterface, SpeakitScreenType, SpeakitModeType, SprintWordInterface, SprintScreenType, OurGameWordInterface
} from '../types';

export type Action =
| { type: 'SET_AUTH', value: AuthInterface }
| { type: 'SET_LOADING', value: boolean }
| { type: 'SET_SETTINGS', value: SettingsInterface }
| { type: 'SET_SPEAKIT_ROUND', value: number}
| { type: 'SET_SPEAKIT_LEVEL', value: number}
| { type: 'SET_SPEAKIT_WORDS', value: SpeakitWordInterface[]}
| { type: 'SET_SPEAKIT_SCREEN', value: SpeakitScreenType}
| { type: 'SET_SPEAKIT_COMPLETE', value: boolean}
| { type: 'SET_SPEAKIT_MODE', value: SpeakitModeType}
| { type: 'SET_SPEAKIT_GAME', value: boolean}
| { type: 'SET_SPRINT_NEW_GAME', value: {level: number, words: SprintWordInterface[], selectLevel:boolean} }
| { type: 'SET_SPRINT_START_GAME'}
| { type: 'SET_SPRINT_SCREEN', value: SprintScreenType}
| { type: 'SET_SPRINT_POINTS_LEVEL', value: number}
| { type: 'SET_SPRINT_ROUND_TIME', value: number}
| { type: 'SET_SPRINT_ROUND_NUMBER', value: number}
| { type: 'SET_SPRINT_LEVEL_NUMBER', value: number}
| { type: 'SET_SPRINT_END_GAME'}
| { type: 'SET_SPRINT_CORRECT_ANSWER', value: {correctAnswersInRowNext: number, pointsLevelNext: number, pointsForAnswerPlus: number}}
| { type: 'SET_SPRINT_STEP_AND_CORRECT_ANSWERS_IN_ROW', value: number }
| { type: 'SET_SPRINT_WORDS', value: SprintWordInterface[]}
| { type: 'SET_OUR_ROUND', value: number}
| { type: 'SET_OUR_LEVEL', value: number}
| { type: 'SET_OUR_WORDS', value: OurGameWordInterface[]}
| { type: 'SET_OUR_SCREEN', value: SpeakitScreenType}
| { type: 'SET_OUR_COMPLETE', value: boolean}
| { type: 'SET_OUR_MODE', value: SpeakitModeType}
| { type: 'SET_OUR_GAME', value: boolean};
