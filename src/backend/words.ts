import { WordStatisticsInterface } from '../types';

export async function downloadAllWordsStatistics(
  userId: string,
  token: string
): Promise<{}[]> {
  return [{}];
}

export async function downloadWordStatistics(
  userId: string,
  token: string
): Promise<{}> {
  return {};
}

export async function uploadWordStatistics(
  word:WordStatisticsInterface,
  userId: string, token: string
): Promise<{ ok: boolean}> {
  return { ok: false };
}

export async function updateWordStatistics(
  word:WordStatisticsInterface,
  userId: string, token: string
): Promise<{ ok: boolean}> {
  return { ok: false };
}
