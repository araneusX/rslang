import { downloadNewWords } from '../backend/words';

downloadNewWords(0, 15, 30).then((words: any) => console.log(words));
