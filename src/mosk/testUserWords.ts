import {
  downloadAllWordsStatistics,
  downloadWordStatistics,
  uploadWordStatistics,
  updateWordStatistics,
  deleteWordStatistics
} from '../backend/words';
import obj from './mockDatasignIn';

uploadWordStatistics(obj.userId, obj.token, obj.word)
  .then((n) => {
    console.log(n);
    downloadAllWordsStatistics(obj.userId, obj.token)
      .then((n) => console.log(n));
    downloadWordStatistics(obj.userId, obj.token, obj.word.wordId)
      .then((n) => console.log(n));
    deleteWordStatistics(obj.userId, obj.token, obj.word.wordId)
      .then((n) => console.log(n));
    deleteWordStatistics(obj.userId, obj.token, obj.word.wordId)
      .then((n) => console.log(n));
  });

export default {};
