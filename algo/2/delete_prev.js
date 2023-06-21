const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
let [counter, input] = fileContent.split('\n').map(el => el.trim());
counter = Number(counter)
input = input.split(' ').map(el => Number(el)).sort((a,b) => a-b);
let result = ''


let map = input.reduce((accumulator, currentValue) => {
  if (currentValue in accumulator) {
    accumulator[currentValue]++
  }
  else accumulator[currentValue] = 1
  return accumulator
}, {})

const keys = Object.keys(map).map(el=> +el);

let max = 0;
for (let i = 0; i < keys.length-1; i++) {
  const curr = keys[i];
  const next = keys[i+1];
  if (Math.abs(curr - next) === 1 && map[curr]+map[next] > max) {
    max = map[curr]+map[next]
  }
}

if (max == 0 && counter > 1) {
  let keyVal = Object.entries(map).map(el => el[1]);
  max = Math.max(...keyVal)
}

result = counter > 1 ? counter - max : 0
console.log(result)

fs.writeFileSync("output.txt", result.toString())