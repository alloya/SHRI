const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const a = fileContent.toString().split('/').filter(seg => seg != '')
let result = []
for (const segment of a) {
    if (segment == '.' || segment == '..') {
      if (segment === '..') result.pop()
    }
  
  else {
    result.push(segment)
  }
  
}

let res = result.join('/').trim();
res = `/${res}`
fs.writeFileSync("output.txt", res)