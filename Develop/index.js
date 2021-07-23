const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/routes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/routes.html'))
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});