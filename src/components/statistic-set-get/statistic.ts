import mock from './mockDatasignIn';
import Optional from './setObj.interface';

(() => {
  async function set(userId: string, optional?: Optional) {
    const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
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
      console.log('statistics has been set:', content);
    } catch (error) {
      console.error('statistics error:', error);
    }
  }
  set(mock.userId, {
    learnedWords: 2,
    optional: { test: 2222222, runcode: 'nodes' }
  });

  async function get(userId: string) {
    const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`;
    try {
      const rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${mock.token}`,
          Accept: 'application/json'
        }
      });
      const content = await rawResponse.json();
      console.log('statistics has been get:', content);
    } catch (error) {
      console.error('statistics error:', error);
    }
  }
  get(mock.userId);
})();
