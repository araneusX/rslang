export type Action =
| { type: 'SET_AUTH', value: boolean }
| { type: 'SET_TOKEN', value: string }
| { type: 'USER_ID', value: string };
