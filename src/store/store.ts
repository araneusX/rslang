interface Auth {
  isAuth: boolean,
  userId: string,
  authToken: string
}

export interface State {
  auth: Auth
}

const auth:Auth = {
  isAuth: false,
  userId: '1',
  authToken: ''
};

export const appState: State = {
  auth
};
