function extractNumbersFromString(str) {
  const numbersOnly = str.replace(/\D/g, '');
  return numbersOnly;
}
console.log(extractNumbersFromString('1213dfdfd232'),'extractNumbersFromString')