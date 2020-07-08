export default (storage: any) => {
  const games = window.localStorage.getItem('rslang-statistics');
  if (games) {
    const arr = JSON.parse(games);
    arr.push(storage);
    window.localStorage.setItem('rslang-statistics', JSON.stringify(arr));
  } else {
    window.localStorage.setItem('rslang-statistics', JSON.stringify([storage]));
  }
};
