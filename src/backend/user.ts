import { UserStatisticsInterface, SettingsInterface } from '../types';

export const logInUser = async (user: object) => {
  const url = 'https://afternoon-falls-25894.herokuapp.com/signin';
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  const request = new Request(url, options);
  try {
    const response = await fetch(request);
    if (!response.ok) {
      switch (response.status) {
        case 404: {
          throw new Error('User is not found.');
        }
        case 403: {
          throw new Error('Invalid username or password.');
        }
        default: throw new Error('Something went wrong...');
      }
    }
    const content = await response.json();
    content.ok = true;
    return content;
  } catch (error) {
    return Promise.resolve({
      id: '',
      ok: false,
      error: error.message
    });
  }
};

export const createUser = async (user: object) => {
  const url = 'https://afternoon-falls-25894.herokuapp.com/users';
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  const request = new Request(url, options);
  try {
    const response = await fetch(request);
    if (!response.ok) {
      switch (response.status) {
        case 422: {
          throw new Error('An error has occurred, check the data you entered.');
        }
        case 417: {
          throw new Error('This email is already registered.');
        }
        default: throw new Error('Something went wrong...');
      }
    }
    const content = await response.json();
    content.ok = true;
    return content;
  } catch (error) {
    return Promise.resolve({
      id: '',
      ok: false,
      error: error.message
    });
  }
};

export const setUserStatistics = async (userId: string, token: string, optional: UserStatisticsInterface) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
  try {
    const rawResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        learnedWords: optional.levelWords.reduce((acc, i) => acc + i) || 1,
        optional: {
          days: JSON.stringify(optional.days),
          levelWords: JSON.stringify(optional.levelWords)
        }
      })
    });
    return { ok: rawResponse.ok };
  } catch (error) {
    return { ok: false };
  }
};

export const getUserStatistics = async (userId: string, token: string) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
  try {
    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    if (!rawResponse.ok) {
      return { ok: false, status: rawResponse.status };
    }
    const content = await rawResponse.json();
    const dataStatistics = content.optional;
    if (!dataStatistics.days) {
      return { ok: false, status: 404 };
    }
    const statistics = {
      days: JSON.parse(dataStatistics.days),
      levelWords: JSON.parse(dataStatistics.levelWords)
    };
    return { statistics, ok: rawResponse.ok, status: rawResponse.status };
  } catch (error) {
    return Promise.resolve({ ok: false, status: 500 });
  }
};

export const getSettings = async (userId: string, token: string) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`;
  try {
    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    if (!rawResponse.ok) {
      return { ok: false, status: rawResponse.status };
    }
    const content = await rawResponse.json();
    if (!content.optional.maxCountCard) {
      return { ok: false, status: 404 };
    }
    return { content, ok: true, status: rawResponse.status };
  } catch (error) {
    return Promise.resolve({
      ok: false,
      content: error,
      status: 500
    });
  }
};

export const setSettings = async (userId: string, token: string, data?: SettingsInterface) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`;
  try {
    const rawResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      return { content, ok: true };
    }
    return { ok: false };
  } catch (error) {
    return Promise.resolve({
      ok: false,
      id: false,
      error
    });
  }
};
