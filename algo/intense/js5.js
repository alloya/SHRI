const countFigure = (char) => {
  return char === '{' ? 1 : char === '}' ? -1 : 0
}

const countSquare = (char) => {
  return char === '[' ? 1 : char === ']' ? -1 : 0
}

const countRound = (char) => {
  return char === '(' ? 1 : char === ')' ? -1 : 0
}

const checkValid = (str) => {
  const arr = str.split('');

  let round = 0;
  let square = 0;
  let figure = 0;

  for (let i = 0; i < arr.length; i++) {
    figure += countFigure(arr[i])
    round += countRound(arr[i])
    square += countSquare(arr[i])
    if (figure < 0 || square < 0 || round < 0) return false;
  }
  return true
}

console.log(checkValid('(({}))'))