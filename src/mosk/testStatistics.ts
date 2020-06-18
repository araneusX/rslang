import mock from './mockDatasignIn';

import { uploadStatistics, downloadStatistics } from '../backend/statistics';

uploadStatistics(mock.userId, mock.token, {
  learnedWords: 2,
  optional: { test: 2222222, statistics: 'statistics' }
}).then((data) => {
  console.log('obj set statistics:', data);
});

downloadStatistics(mock.userId, mock.token).then((data) => {
  console.log('obj get statistics:', data);
});
