import mock from './mockDatasignIn';
import Optional from './setObj.interface';

(() => {
  async function set(userId: string, optional?: Optional) {
    const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`;
    try {
      const rawResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${mock.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(optional)
      });
      const content = await rawResponse.json();
      console.log('has been set:', content);
    } catch (error) {
      console.error('error:', error);
    }
  }
  set(mock.userId, {
    wordsPerDay: 5,
    optional: { test: 5566, runcode: 'inex done' }
  });

  async function get(userId: string) {
    const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`;
    try {
      const rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${mock.token}`,
          Accept: 'application/json'
        }
      });
      const content = await rawResponse.json();
      console.log('has been get:', content);
    } catch (error) {
      console.error('error:', error);
    }
  }
  get(mock.userId);
})();
