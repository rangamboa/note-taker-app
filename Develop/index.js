const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to save a note.`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  const newNote = { title, text }
    
    // Convert the data to a string so we can save it
    const noteString = JSON.stringify(newNote);

    // Write the string to a file
    fs.writeFile(`./db/${newNote.title}.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Note for ${newNote.title} has been written to JSON file`
          )
    );
});

app.get('/routes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/routes.html'))
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});