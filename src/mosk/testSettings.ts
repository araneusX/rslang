import mock from './mockDatasignIn';

import { uploadSettings, downloadSettings } from '../backend/settings';

uploadSettings(mock.userId, mock.token, {
  wordsPerDay: 5,
  optional: { test: 54321, set: 'setSettings' }
}).then((data) => {
  console.log('obj set settings:', data);
});

downloadSettings(mock.userId, mock.token).then((data) => {
  console.log('obj get settings:', data);
});
