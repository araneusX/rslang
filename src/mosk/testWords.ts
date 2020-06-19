import getWords from '../backend/words';

getWords(0, 15, 30).then((words) => console.log(words));
