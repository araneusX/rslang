import { Settings } from './store';

export type Action =
| { type: 'SET_AUTH', value: boolean }
| { type: 'SET_SETING', value: Settings }
| { type: 'SET_TOKEN', value: string }
| { type: 'USER_ID', value: string };
