const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");
let [glossary, input] = fileContent.split('\n');
glossary = glossary.trim().split(' ');
input = input.trim().split(' ');

const tree = { value: 'root', children: {} };

function insert(trie, key) {
  let node = trie;
  for (let i = 0; i < key.length; i++) {
    const char = key[i];
    if (!(char in node.children)) {
      node.children[char] = { level: i+1, children: {} }
    }
    if (node.children[char].key) return;
    node = node.children[char];
  }
  node.key = true;
  node.children = {};
}

function search(trie, prefix) {
  result = {};
  if (prefix.length == 0) return prefix;
  let node = trie;
  let temp = [];
  for (let i = 0; i < prefix.length; i++) {
    const char = prefix[i];
    if (!(char in node.children)) return prefix;
    temp.push(char)
    node = node.children[char]
    if (node.key) return temp.join('')
  }
  return prefix
}

glossary.forEach(word => {
  insert(tree, word)
});

let res = input.map(word => {
  word = search(tree, word);
  return word;
})
console.log(res.join(' '))

fs.writeFileSync("output.txt", res.join(' '))