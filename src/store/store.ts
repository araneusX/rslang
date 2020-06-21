interface Auth {
  isAuth: boolean,
  userId: string,
  authToken: string
}

export interface Settings {
  wordsPerDay: number,
  optional: {
    maxCountCard: number,
    imageToCard: boolean,
    pronounseToCard: boolean,
    transcriptionToCard: boolean,
    translateToTheCard: boolean,
    exampleToCard: boolean,
    explainToCard: boolean,
    showAnswerButton: boolean,
    wordDeleteButton: boolean,
    addToDifficultWordsButton: boolean,
    addGrageButton: boolean,

  }
}

export interface State {
  auth: Auth
  settings: Settings
}

const auth:Auth = {
  isAuth: false,
  userId: '1',
  authToken: ''
};

export const settings:Settings = {
  wordsPerDay: 10,
  optional: {
    maxCountCard: 20,
    imageToCard: false,
    pronounseToCard: false,
    transcriptionToCard: false,
    translateToTheCard: false,
    exampleToCard: false,
    explainToCard: false,
    showAnswerButton: false,
    wordDeleteButton: false,
    addToDifficultWordsButton: false,
    addGrageButton: false
  }
};

export const appState: State = {
  auth,
  settings
};
