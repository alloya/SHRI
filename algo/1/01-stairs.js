const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
let [n, input] = fileContent.toString().trim().split('\n')
let min
input = input.trim().split(' ')
let time = input.map(el => {
  [hour, minute] = el.trim().split(':');
  return Number(hour) * 60 + Number(minute);
})

if (time.length > 1) {
  time.sort((a, b) => a - b);
  min = 24 * 60 + time[0] - time[time.length-1]
  for (let i = 1; i < time.length; i++) {
    min = Math.min(min, time[i] - time[i - 1])
  }
 // min = Math.min(min, time[time.length-1] - time[0])
}


else {
  min = 1440
}
console.log(min)

fs.writeFileSync("output.txt", min.toString())