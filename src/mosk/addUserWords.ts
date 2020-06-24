import { getWords } from '../backend/words';
import { StatisticsInterface, BackendWordInterface } from '../types';

async function test(statistics: StatisticsInterface) {
  console.log(JSON.stringify(statistics.getAllWords()));
  const word = statistics.getWord();
  statistics.saveWord(word.wordId, true, 1, 0);
  console.log(statistics.getAllWords());
}

export default test;
