export default async (userId: string, token: string) => {
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
    console.log('settings has been get:', content);
  } catch (error) {
    console.error('settings error:', error);
  }
};
