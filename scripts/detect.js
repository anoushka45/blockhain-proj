app.post("/detect", upload.single("contract"), (req, res) => {
  if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
  }

  const code = req.file.buffer.toString(); 
  const patterns = [
    { name: "Reentrancy", regex: /(\.call\(\{value:\s*\w+\}\)|\.call\(\s*\{?\s*value:\s*\w+\s*\}?\))/g },
    { name: "Integer Overflow", regex: /uint\d*\s+\w+\s*=\s*\w+\s*(\+|\*)\s*\w+/g },
    { name: "Integer Underflow", regex: /uint\d*\s+\w+\s*=\s*\w+\s*-\s*\w+/g },
    { name: "Unprotected Selfdestruct", regex: /selfdestruct\(.*\)/g }
];



  let issues = {};
  patterns.forEach((pattern) => {
      const matches = [...code.matchAll(pattern.regex)];
      if (matches.length > 0) {
          issues[pattern.name] = matches.length;
      }
  });

  res.json({
      message: Object.keys(issues).length > 0 ? "⚠️ Vulnerabilities detected!" : "✅ No vulnerabilities found.",
      vulnerabilities: issues
  });
});
