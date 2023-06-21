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

for (const [key, value] of Object.entries(map)) {
  let localMax = value;
  let prev = map[Number(key)-1];
  let next = map[Number(key)+1]
  if (next) {
    localMax += next;
  }
  if (prev) {
    localMax = localMax > value + prev ? localMax : value + prev
  }
  max = max > localMax ? max : localMax;
}

result = counter > 1 ? counter - max : 0
console.log(result)
fs.writeFileSync("output.txt", result.toString())