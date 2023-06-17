let cnt = 0;
process.stdin.on('data', data => {
  while (data - cnt >= 0) {
    data = data - cnt;
    cnt ++;
  }
  process.stdout.write(cnt);
  process.exit();
});

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
    console.log(line);
});

rl.once('close', () => {
     console.log()
 });