import { getWords } from '../backend/words';
import { StatisticsInterface, BackendWordInterface } from '../types';

async function test(statistics: StatisticsInterface) {
  console.log(JSON.stringify(statistics.getAllWordsId()));
  const wordId = statistics.getWordId();
  if (wordId) {
    statistics.saveWord(wordId, true, 1, 0);
  }
  console.log(statistics.getAllWordsId());
}

export default test;
