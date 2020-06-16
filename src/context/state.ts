export type AuthType = {
  isAuth: boolean;
  userId: any;
  authToken: string;
};

export type InitialStateType = {
  auth: AuthType;
};

const auth:AuthType = {
  isAuth: false,
  userId: 1,
  authToken: ''
};

export const initialState = {
  auth
};
