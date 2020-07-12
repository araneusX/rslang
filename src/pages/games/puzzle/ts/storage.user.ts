export default (storage: any) => {
  const level = window.localStorage.getItem('rslang-statistics-level');
  const page = window.localStorage.getItem('rslang-statistics-page');
  if (storage.action === 'set') {
    window.localStorage.setItem('rslang-statistics-level', storage.level);
    window.localStorage.setItem('rslang-statistics-page', storage.page);
  }
  if (level && page) {
    return { level, page };
  }
  return { level: '0', page: '0' };
};
