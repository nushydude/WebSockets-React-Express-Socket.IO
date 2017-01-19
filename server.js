const express = require('express');

const path = require('path');

const compression = require('compression');

const bodyParser = require('body-parser');

const files = require('./server_modules/files');

const app = express();

const port = process.env.PORT || 8081;

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/files', (req, res) => {
  console.log('/api/files');
  const filesList = files.ReadFiles();
  if (filesList) {
    res.json(filesList);
  } else {
    res.status(500).send('An error occurred while quering the files list');
  }
});

// we are only sending the index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server started at localhost:${port}.`);
});
