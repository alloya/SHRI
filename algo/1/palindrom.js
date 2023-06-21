
const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
let str = fileContent.trim().split('\n').filter(seg => seg != '').toString().trim()
let res
if (str.length === 1) {
  res = ''
}
else {
  let middle = Math.floor(str.length/2)
  let arr = str.split('');
  if (arr.every(el => el === 'a')) {
    arr[arr.length-1] = 'b'
    res = arr.join('')
  }
  else {
    for (i = 0; i < middle; i++) {
      if (arr[i] !== 'a') {
        arr[i] = 'a'
        res = arr.join('')
        break
      }
    else if (i+1 == middle) {
      arr[arr.length-1] = 'b'
      res = arr.join('')
      break
    }
    }
  }
  
}
console.log(str)
console.log(res)

fs.writeFileSync("output.txt", res)