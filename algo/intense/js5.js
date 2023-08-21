const isOpens = (char) => {
  if (char === '{' || char == '(' || char === '[') return true;
  return false;
}

const obj = { '(': 0, ')': 0, '{': 0, '}': 0, '[': 0, ']': 0 }

const checkMatch = (first, second) => {
  switch (first) {
    case '(':
      return second === ')'
    case '{':
      return second === '}'
    case '[':
      return second === ']'
    default:
      break;
  }
}

const checkValid = (str) => {
  let arr = str.split('');
  arr = arr.filter(el => Object.hasOwn(obj, el))
  if (arr.length % 2 !== 0 || !isOpens(arr[0])) return false
  let res = [];

  for (let i = 0; i < arr.length; i++) {
    if (isOpens(arr[i])) res.push(arr[i]);
    else {
      let last = res.pop();
      let match = checkMatch(last, arr[i]);
      if (!match) return false
    }
    
  }

  return res.length == 0

}

console.log(checkValid(`([(]))`))
console.log(checkValid(`(([()]))`))
console.log(checkValid(`(){}[]([]){()}`))