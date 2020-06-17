import mock from './mockDatasignIn';

import setSettings from './setSettings';
import getSettings from './getSettings';

setSettings(mock.userId, mock.token, {
  wordsPerDay: 5,
  optional: { test: 54321, set: 'setSettings' }
});

getSettings(mock.userId, mock.token);
