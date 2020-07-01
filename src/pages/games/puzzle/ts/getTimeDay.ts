export default () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date();
  const currentDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  const hour = `${date.getHours()}`;
  const minute = `${Number(date.getMinutes()) >= 10 ? date.getMinutes() : 0 + String(date.getMinutes())}`;
  const second = `${Number(date.getSeconds()) >= 10 ? date.getSeconds() : 0 + String(date.getSeconds())}`;
  return `${currentDate} ${hour}:${minute}:${second}`;
};
