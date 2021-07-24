// Set up packages.
const fs = require('fs');
const path = require('path');

// Set up express.
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up main routes.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {

  // fs.readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  fs.readFile('./db/db.json', 'utf8', (err, data) => { if (err) console.error(err) });

});

app.post('/api/notes', (req, res) => {
    let data = JSON.stringify(res);
    fs.writeFile('db/db.json', data, (err) => {
    if (err) throw err;
    return true;
  });
});

// Check and display port.
app.listen(PORT, () => {
  console.log(`----- App is listening on: http://localhost:${PORT}. -----`);
});