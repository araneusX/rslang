function pxTOvw(value: number) {
  const x = window.innerWidth;
  const result = (100 * value) / x;
  // console.log('value <> result:', value, result);
  return result;
}

function pxTOvh(value: number) {
  const y = window.innerHeight;

  const result = (100 * value) / y;
  return result;
}

export { pxTOvw, pxTOvh };
