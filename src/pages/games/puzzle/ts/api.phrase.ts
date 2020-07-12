export default async (group: string, page: string) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
