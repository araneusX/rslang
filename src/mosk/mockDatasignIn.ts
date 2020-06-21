import { WordStatisticsInterface } from '../types';
import { getFormattedDate } from '../utils';

export default {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTJhZjlmNmI2ODlhMDAxNzllYWQ2ZSIsImlhdCI6MTU5MjY0MTMwMCwiZXhwIjoxNTkyNjU1NzAwfQ.f_siSu_bUBUQHjr3DghcVvJoHi4RS9dEkaU6-2tHz_Y",
  userId: "5ee2af9f6b689a00179ead6e",
  input: {
    email: 'o@user.com',
    password: 'Gfhjkm_123'
  },
  words: ['5e9f5ee35eb9e72bc21af4a1', '5e9f5ee35eb9e72bc21af4a0', '5e9f5ee35eb9e72bc21af4a2'],
  word: {
    wordId: '5e9f5ee35eb9e72bc21af4a5',
    allRight: 4,
    allShow: 5,
    continuedRight: 2,
    difficulty: 0,
    isDeleted: false,
    isDifficult: false,
    isNew: false,
    lastRight: getFormattedDate()
  } as WordStatisticsInterface
};
