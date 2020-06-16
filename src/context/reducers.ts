import { InitialStateType, AuthType } from './state';

type ActionMap<M extends { [index: string]: any}> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
      type: Key;
    }
    : {
      type: Key;
      payload: M[Key];
    }
};

export enum Types {
  AddUser= 'ADD_USER_DATA',
  LogOut= 'USER_LOGOUT'
}

type AppPayload = {
  [Types.AddUser] : {
    auth: AuthType;
  };
};

export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];

export const appReducer = (state:InitialStateType, action:AppActions) => {
  switch (action.type) {
    case Types.AddUser:
      return { ...state, auth: action.payload.auth };
    default:
      return state;
  }
};
