import { Resolver, resolve } from 'dns';
import { WordStatisticsInterface } from '../types';

export async function getWords(group: number, page: number) {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getWordById(id: string) {
  const url = `https://afternoon-falls-25894.herokuapp.com/words/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getManyWordsByIdSorted(ids: string[]) {
  const promisesFunc = ids.map((id) => async (arrWord: any[]) => {
    const word: any = await getWordById(id);
    return [].concat(...arrWord, word);
  });
  try {
    const applyAsync = (acc: any, val: any) => acc.then(val);
    const content = await promisesFunc.reduce(applyAsync, Promise.resolve([]));
    return { content, ok: true };
  } catch (error) {
    return { content: error, ok: false };
  }
}

export async function getManyWordsById(ids: string[]) {
  const promises = ids.map((id) => getWordById(id));
  try {
    const content = await Promise.all(promises);
    return { content, ok: true };
  } catch (error) {
    return { content: error, ok: false };
  }
}

function chunk(start: number) {
  return { page: Math.floor(start / 20), withWord: start % 20 };
}

function countRequest(startNum: number, quantityNum: number) {
  if (startNum === quantityNum) {
    return Math.ceil(quantityNum / 20);
  }
  return Math.ceil(quantityNum / 20) + 1;
}

export const downloadNewWords = async (group: number, startWith: number, quantity: number) => {
  const totalWords = new Array(countRequest(startWith, quantity)).fill('');

  const { page, withWord } = chunk(startWith);

  const promisesFunc = totalWords.map((v, i) => async (arrWord: any[]) => {
    const words: any = await getWords(group, page + i);
    return [].concat(...arrWord, words.flat());
  });

  try {
    const applyAsync = (acc: any, val: any) => acc.then(val);
    const words = await promisesFunc.reduce(applyAsync, Promise.resolve([]));
    const content = words.slice(withWord, quantity + withWord);
    return {
      ok: true,
      content
    };
  } catch (error) {
    return { ok: false, content: [] };
  }
};

export async function downloadAllWordsStatistics(
  userId: string,
  token: string
): Promise<{content: [], ok: boolean}> {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`;
  try {
    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    const data = await rawResponse.json();
    const content = data.map((obj: any) => {
      if (obj.optional && obj.optional.wordId) {
        return obj.optional;
      }
      return { wordId: obj.wordId };
    });
    return { content, ok: rawResponse.ok };
  } catch (error) {
    return { content: [], ok: false };
  }
}

export async function downloadWordStatistics(
  userId: string,
  token: string,
  wordId: string
): Promise<{content: {} | Error, ok: boolean}> {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`;
  try {
    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    if (!rawResponse.ok) {
      return { content: rawResponse.status, ok: rawResponse.ok };
    }
    const data = await rawResponse.json();
    const content = data.optional;
    return { content, ok: rawResponse.ok };
  } catch (error) {
    return { content: error, ok: false };
  }
}

export async function uploadWordStatistics(
  userId: string,
  token: string,
  word: WordStatisticsInterface
): Promise<{ ok: boolean}> {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${word.wordId}`;
  try {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        difficulty: 'user',
        optional: word
      })
    });

    return { ok: rawResponse.ok };
  } catch (error) {
    return { ok: false };
  }
}

export async function updateWordStatistics(
  userId: string,
  token: string,
  word:WordStatisticsInterface
): Promise<{ ok: boolean}> {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${word.wordId}`;
  try {
    const rawResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        difficulty: 'user',
        optional: word
      })
    });

    return { ok: rawResponse.ok };
  } catch (error) {
    return { ok: false };
  }
}

export async function deleteWordStatistics(
  userId: string,
  token: string,
  wordId: string
): Promise<{ ok: boolean}> {
  const url = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`;
  try {
    const rawResponse = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return { ok: rawResponse.ok };
  } catch (error) {
    return { ok: false };
  }
}
