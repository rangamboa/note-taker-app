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

  fs.readFile('./db/db.json', 'utf8', (err, data) => { if (err) console.error(err) });

});

app.post('/api/notes', (req, res) => {

  // let newNote = { title: req.body.title, text: req.body.text };
  let newNote = req.body;
  let newString = JSON.stringify(newNote);

  console.log(newString);

    fs.writeFile('db/db.json', newString, (err) => {
    if (err) throw err;
    return newString;
  });
});

// Check and display port.
app.listen(PORT, () => {
  console.log('\n----- currently in public folder -----\n');
  console.log(`----- App is listening on: http://localhost:${PORT}. -----`);
});