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
