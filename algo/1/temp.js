const readline = require('readline');
let first, second;
let count = 0;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  if (!first) {
    first = line.split('')
    console.log(first)
  }
  else {
    second = line.split('');
    console.log(second)
  }
  if (first && second) {
    first.forEach(fistEl => {

      for (el in second) {
        if (el == fistEl) {
          count++;
        }
      }
    })
    }
});

rl.once('close', () => {
  console.log(count)
});