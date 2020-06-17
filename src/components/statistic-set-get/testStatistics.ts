import mock from './mockDatasignIn';

import setStatistics from './setStatistics';
import getStatistics from './getStatistics';

setStatistics(mock.userId, mock.token, {
  learnedWords: 2,
  optional: { test: 2222222, statistics: 'statistics' }
}).then((data) => {
  console.log('obj set statistics:', data);
});

getStatistics(mock.userId, mock.token).then((data) => {
  console.log('obj get statistics:', data);
});
