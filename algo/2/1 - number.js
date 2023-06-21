const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
let input = fileContent.toString().trim()
const substrings = [];
let res = {}

for (let i = 0; i < input.length; i += 2) {
  substrings.push(input.substr(i, 2));
}

substrings.forEach(el => {
  if (!(el[1] in res)) res[el[1]] = new Set([el[0]])
  else res[el[1]] = res[el[1]].add(el[0])
})
let result = 0
for (key in res) {
  if (res[key].size === 3) result++
}

fs.writeFileSync("output.txt", result.toString())