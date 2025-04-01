// server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const detect = require('./scripts/detect'); // Import the vulnerability detection logic

const app = express();

// Enable CORS for the frontend
app.use(cors());

// Set up body parser for JSON
app.use(bodyParser.json());

// Set up static files for the frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Multer setup to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// API to upload the .sol file
app.post('/upload', upload.single('contract'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Call the vulnerability detection logic
  const contractContent = require('fs').readFileSync(req.file.path, 'utf8');
  const vulnerabilities = detect.analyze(contractContent);

  res.json({
    message: 'File uploaded and analyzed successfully!',
    vulnerabilities: vulnerabilities
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
