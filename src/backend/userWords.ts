interface Optional {
  difficulty: string,
  optional: object
}

export const downloadUserWords = async (userId: string, token: string) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`;
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
    return { message: error, ok: false, id: '' };
  }
};

export const downloadUserWord = async (userId: string, token: string, wordId: string) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`;
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
    return { message: error, ok: false, id: '' };
  }
};

export const uploadCreateUserWord = async (userId: string, token: string, wordId: string, optional: Optional) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`;
  try {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(optional)
    });

    const { status } = rawResponse;
    let content;
    switch (status) {
      case 200:
        content = await rawResponse.json();
        return content;
      default:
        content = await rawResponse.text();
        return { message: content, ok: false, id: '' };
    }
  } catch (error) {
    return { message: error, ok: false, id: '' };
  }
};

export const uploadUpdateUserWord = async (userId: string, token: string, wordId: string, optional: Optional) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`;
  try {
    const rawResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(optional)
    });

    const { status } = rawResponse;
    let content;
    switch (status) {
      case 200:
        content = await rawResponse.json();
        return content;
      default:
        content = await rawResponse.text();
        return { message: content, ok: false, id: '' };
    }
  } catch (error) {
    return { message: error, ok: false, id: '' };
  }
};

export const uploadDeleteUserWord = async (userId: string, token: string, wordId: string) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`;
  try {
    const rawResponse = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const { status } = rawResponse;
    return { message: 'user words by id deleted', wordId, status };
  } catch (error) {
    return { message: error, ok: false, id: '' };
  }
};
