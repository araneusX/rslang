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
