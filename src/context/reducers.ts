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
  Add = 'ADD_START_DATA'
}

type AppType = {
  appState: string;
};

type AppPayload = {
  [Types.Add] : {
    appState: string;
  };
};

export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];

export const appReducer = (state:AppType[], action:AppActions) => {
  switch (action.type) {
    case Types.Add:
      return [...state, action.payload];
    default:
      return state;
  }
};
