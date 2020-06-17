import mock from './mockDatasignIn';

import setStatistics from './setStatistics';
import getStatistics from './getStatistics';

setStatistics(mock.userId, mock.token, {
  learnedWords: 2,
  optional: { test: 2222222, runcode: 'nodes' }
});
getStatistics(mock.userId, mock.token);
