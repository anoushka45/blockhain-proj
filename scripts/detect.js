const detect = {
  analyze: (contractContent, fileType) => {
    let vulnerabilities = [];

    if (fileType === 'sol') {
      // Solidity vulnerability checks
      if (/\.\s*call\(|\.send\(|\.transfer\(/.test(contractContent)) {
        vulnerabilities.push("Solidity: Potential Reentrancy Attack: Usage of low-level calls.");
      }
      if (/function\s+[a-zA-Z0-9_]+\s*\(.+\)\s*public/.test(contractContent)) {
        vulnerabilities.push("Solidity: Gas Limit Issue: Public function without gas optimizations.");
      }
      if (/\s*storage\s+[a-zA-Z0-9_]+\s*;/.test(contractContent)) {
        vulnerabilities.push("Solidity: Uninitialized Storage Variable detected.");
      }
      if (/\bnow\b/.test(contractContent)) {
        vulnerabilities.push("Solidity: Deprecation Warning - use block.timestamp instead of 'now'.");
      }
    } else if (fileType === 'rs') {
      // Rust vulnerability checks
      // Normalize content: Remove extra whitespace
      const normalizedContent = contractContent.replace(/\s+/g, ' ');

  console.log("Rust contract content:", normalizedContent); // Debugging: Check if content is being passed correctly

  if (/unsafe\s*\{[^}]*\}/g.test(normalizedContent)) {
    vulnerabilities.push("Rust: Unsafe block detected. Review for potential memory issues.");
  }
  if (/\bunwrap\s*\(/g.test(normalizedContent)) {
    vulnerabilities.push("Rust: Potential panic risk - unwrap() usage detected.");
  }
  if (/\bexpect\s*\(/g.test(normalizedContent)) {
    vulnerabilities.push("Rust: Potential panic risk - expect() usage detected.");
  }
    } else {
      vulnerabilities.push("Unsupported file type or no checks defined for this type.");
    }

    return vulnerabilities;
  }
};

module.exports = detect;
