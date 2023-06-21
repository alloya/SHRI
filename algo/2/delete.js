const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
let [counter, input] = fileContent.split('\n').map(el => el.trim());
counter = Number(counter)
input = input.split(' ');

let max = 0;

let map = input.reduce((accumulator, currentValue) => {
  if (currentValue in accumulator) {
    accumulator[currentValue]++
  }
  else accumulator[currentValue] = 1
  return accumulator
}, {})

const keys = Object.keys(map).sort((a, b) => a - b);
let currVal = keys[0] && map[keys[0]];
if (keys.length > 1) {
  for (let i = 1; i < keys.length; i++) {
    const nextVal = map[keys[i]];
    let localMax = currVal;
    if (Math.abs(keys[i - 1] - keys[i]) <= 1) localMax += nextVal
    else {
      localMax = localMax > nextVal ? localMax : nextVal
    }
    max = max > localMax ? max : localMax;
    currVal = nextVal;
  }
}
else {
  max = currVal || ''
}


// for (const [key, value] of Object.entries(map)) {
//   let localMax = value;
//   let prev = map[Number(key)-1];
//   let next = map[Number(key)+1]
//   if (next) {
//     localMax += next;
//   }
//   if (prev) {
//     localMax = localMax > value + prev ? localMax : value + prev
//   }
//   max = max > localMax ? max : localMax;
// }

result = input.length > 1 ? input.length - max : 0
console.log(result)
fs.writeFileSync("output.txt", result.toString())