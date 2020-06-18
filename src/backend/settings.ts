export default interface Optional {
  wordsPerDay: number, // has been > 0
  optional?: object
}

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
