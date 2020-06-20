import { UserStatisticsInterface } from '../types';

export interface Optional {
  wordsPerDay: number, // has been > 0
  learnedWords: number, // has been > 0
  optional?: object
}

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
  const response = await fetch(request);
  const content = await response.json();
  const { status } = response;
  if (status >= 400) return `error: ${status}`;
  return content;
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
  const response = await fetch(request);
  const content = await response.json();
  const { status } = response;
  if (status >= 400) return `error: ${status}`;
  return content;
};

export const downloadSettings = async (userId: string, token: string) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`;
  try {
    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    return Promise.resolve({
      ok: false,
      id: false
    });
  }
};

export const uploadSettings = async (userId: string, token: string, optional?: Optional) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`;
  try {
    const rawResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(optional)
    });
    const content = await rawResponse.json();
    return content;
  } catch (error) {
    return Promise.resolve({
      ok: false,
      id: false
    });
  }
};

export const uploadUserStatistics = async (userId: string, token: string, optional: UserStatisticsInterface) => {
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

export const downloadUserStatistics = async (userId: string, token: string) => {
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
      return { ok: false };
    }
    const content = await rawResponse.json();
    const dataStatistics = content.optional;
    if (!dataStatistics.days) {
      return { ok: false };
    }
    const statistics = {
      days: JSON.parse(dataStatistics.days),
      levelWords: JSON.parse(dataStatistics.levelWords)
    };
    return { statistics, ok: rawResponse.ok };
  } catch (error) {
    return Promise.resolve({
      ok: false
    });
  }
};
