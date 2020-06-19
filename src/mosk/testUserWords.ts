import {
  downloadUserWords,
  downloadUserWord,
  uploadCreateUserWord,
  uploadUpdateUserWord,
  uploadDeleteUserWord
} from '../backend/userWords';
import obj from './mockDatasignIn';

downloadUserWords(obj.userId, obj.token)
  .then((n) => console.log(n));
downloadUserWord(obj.userId, obj.token, obj.words[1])
  .then((n) => console.log(n));
uploadCreateUserWord(obj.userId, obj.token, obj.words[1], {
  difficulty: '1',
  optional: { words: 'obj.words[1]' }
});
uploadUpdateUserWord(obj.userId, obj.token, obj.words[1], {
  difficulty: '1',
  optional: { words: 'obj.words[1]' }
})
  .then((n) => console.log(n));
uploadDeleteUserWord(obj.userId, obj.token, obj.words[1])
  .then((n) => console.log(n));
