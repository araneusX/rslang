import mock from './mockDatasignIn';

import setSettings from './setSettings';
import getSettings from './getSettings';

setSettings(mock.userId, mock.token, {
  wordsPerDay: 5,
  optional: { test: 54321, set: 'setSettings' }
}).then((data) => {
  console.log('obj set settings:', data);
});

getSettings(mock.userId, mock.token).then((data) => {
  console.log('obj get settings:', data);
});
