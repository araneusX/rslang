import Optional from './setObj.interface';

export default async (userId: string, token: string, optional?: Optional) => {
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
    console.log('statistics has been set:', content);
  } catch (error) {
    console.error('statistics error:', error);
  }
};
