interface Auth {
  isAuth: boolean,
  userId: string,
  authToken: string
}

export interface Settings {
  wordsPerDay: number,
  optional: {
    level: number,
    maxCountCard: number,
    cardSetting: {
      image: boolean,
      transcription: boolean
    },
    buttonSeting: {
      answerButton: boolean,
      addToDifficultWordsButton: boolean,
      wordDeleteButton: boolean
    }
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
    level: 0,
    maxCountCard: 20,
    cardSetting: {
      image: true,
      transcription: true
    },
    buttonSeting: {
      answerButton: true,
      addToDifficultWordsButton: true,
      wordDeleteButton: true
    }
  }
};

export const appState: State = {
  auth,
  settings
};
