const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'cranscribe/')));
app.get('cranscribe/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'cranscribe/', 'index.html'));
});
app.listen(22799);