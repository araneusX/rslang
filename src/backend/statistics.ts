export interface Optional {
  learnedWords: number, // has been > 0
  optional?: object
}

export const uploadStatistics = async (userId: string, token: string, optional?: Optional) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
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
      id: false,
      ok: false
    });
  }
};

export const downloadStatistics = async (userId: string, token: string) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
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
      id: false,
      ok: false
    });
  }
};
