export const getRandomString = () => {
  const randomItems = new Uint32Array(28);
  crypto.getRandomValues(randomItems);
  const binaryStringItems = randomItems.map(dec => `0${dec.toString(16).substr(-2)}`)
  return binaryStringItems.reduce((acc, item) => `${acc}${item}`, '');
}
