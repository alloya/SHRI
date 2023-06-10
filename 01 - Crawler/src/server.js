//import express from 'express';
const express = require("express");

const app = express();
const { fetcher } = require('../fetcher.js');
app.use(express.json());
app.listen(3000, () => {
  console.log(`App listening on port 3000`)
})

app.post('/parse', async (req, res) => {
  try {
    const { domainName } = req.body;
    const result = []
    let order = [];
    let visited = [];
    order.push(domainName);
    visited.push(domainName);
    while (order.length > 0) {
      const url = order.shift();
      let res = await fetcher(url)
      if (res?.status >= 500) {
        res = await fetcher(url)
      }
      if (res?.status == 200) {
        result.push(url);
        const content = await res?.text();
        let arr = [...content.matchAll(/href=(["'])(.*?)\1/g)]
          .map(el => el[2])
          .filter(el => !visited.includes(el))
        arr = [...new Set(arr)];
        order = order.concat(arr)
        visited = visited.concat(arr)
      }
    }

    res.send(result)
    res.end()
  } catch (err) {
    console.log(err)
  }
})




/*
    TODO: краулер страницы
    POST http://localhost:3000/parse
    body: { domainName: string}
    return string[]
*/