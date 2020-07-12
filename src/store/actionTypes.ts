import {
  SettingsInterface,
  AuthInterface,
  SpeakitWordInterface,
  SpeakitScreenType,
  SpeakitModeType,
  SprintWordInterface,
  SprintScreenType,
  TrainingScreenType,
  BackendWordInterface,
  AudioCallScreenType
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
| { type: 'SET_TRAINING_SCREEN', value: TrainingScreenType }
| { type: 'SET_TRAINING_COMPLETE', value: boolean }
| { type: 'SET_TRAINING_AUDIO', value: boolean }
| { type: 'SET_TRAINING_CARD', value: BackendWordInterface }
| { type: 'SET_TRAINING_FIRST_VISIT', value: boolean }
| { type: 'SET_TRAINING_MODE', value: string }
| { type: 'SET_TRAINING_CARD_DELETE', value: boolean}
| { type: 'SET_AUDIO_WORDS', value:{words: BackendWordInterface[], allAnswerArray: string[], level: number }}
| { type: 'SET_AUDIO_START_GAME'}
| { type: 'SET_AUDIO_INITIAL'}
| { type: 'SET_AUDIO_CORRECT_ANSWER', value: {correctAnswer:BackendWordInterface[], addAnswer: boolean, answerType: boolean}}
| { type: 'SET_AUDIO_ERROR_ANSWER', value: {errorAnswer:BackendWordInterface[], addAnswer: boolean, answerType: boolean}}
| { type: 'SET_AUDIO_STEP', value: number}
| { type: 'SET_AUDIO_NEW_GAME', value: {level: number, words: BackendWordInterface[], allAnswerArray: string[], page:number}}
| { type: 'SET_AUDIO_SCREEN', value: AudioCallScreenType}
| { type: 'CLEAR_STATE' };
