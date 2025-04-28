const express = require('express');
const fileUpload = require('express-fileupload');
const detect = require('./scripts/detect');
const app = express();
const path = require('path');

app.use(fileUpload());
app.use(express.static('frontend')); // Serve frontend files

app.post('/analyze', (req, res) => {
  if (!req.files || !req.files.contract) {
    return res.status(400).send('No file uploaded.');
  }

  const file = req.files.contract;
  const content = file.data.toString('utf8');
  const ext = path.extname(file.name).slice(1); // Get extension without dot

  const vulnerabilities = detect.analyze(content, ext);

  res.json({ vulnerabilities, fileType: ext });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
