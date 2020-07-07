import { WordStatisticsInterface } from '../types';
import { SERVER } from '../constants';

export async function getWords(group: number, page: number) {
  const url = `${SERVER}/words?group=${group}&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getWordById(id: string) {
  const url = `${SERVER}/words/${id}?noAssets=true`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
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
  const totalWords = Array(countRequest(startWith, quantity));

  const { page, withWord } = chunk(startWith);

  for (let i = 0; i < totalWords.length; i += 1) {
    totalWords[i] = getWords(group, page + i);
  }
  let words;
  try {
    words = await (await Promise.all(totalWords)).flat();
    return {
      ok: true,
      content: words.slice(withWord, quantity + withWord)
    };
  } catch (error) {
    return { ok: false, content: error };
  }
};

export async function downloadAllWordsStatistics(
  userId: string,
  token: string
): Promise<{content: [], ok: boolean}> {
  const url = `${SERVER}/users/${userId}/words`;
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
  const url = `${SERVER}/users/${userId}/words/${wordId}`;
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
  const url = `${SERVER}/users/${userId}/words/${word.wordId}`;
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
  const url = `${SERVER}/users/${userId}/words/${word.wordId}`;
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
  const url = `${SERVER}/users/${userId}/words/${wordId}`;
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
