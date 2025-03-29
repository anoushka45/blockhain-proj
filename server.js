const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.text()); // Ensure raw text input is processed

// Serve static frontend files
app.use(express.static(path.join(__dirname, "frontend")));

// Vulnerability patterns
const patterns = [
  { name: "Reentrancy", regex: /(\.call\(\{value:\s*\w+\}\)|\.call\(\s*\{?\s*value:\s*\w+\s*\}?\))/g },
  { name: "Integer Overflow", regex: /uint\d*\s+\w+\s*=\s*\w+\s*(\+|\*)\s*\w+/g },
  { name: "Integer Underflow", regex: /uint\d*\s+\w+\s*=\s*\w+\s*-\s*\w+/g },
  { name: "Unprotected Selfdestruct", regex: /selfdestruct\(.*\)/g }
];


// Endpoint to check vulnerabilities
app.post("/detect", (req, res) => {
    const code = req.body;
    if (!code) {
        return res.status(400).json({ message: "No contract code received!" });
    }

    let issues = patterns
        .filter(pattern => pattern.regex.test(code))
        .map(pattern => `🚨 ${pattern.name} vulnerability found!`);

    res.json({ message: issues.length > 0 ? issues.join("\n") : "✅ No vulnerabilities found." });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
