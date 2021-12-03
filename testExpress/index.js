const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('index.html');
});

app.get('/voyager.worker.js', (req, res) => {
  //Add CORS headers
  res.send('index2.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
