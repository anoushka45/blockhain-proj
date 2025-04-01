// scripts/detect.js
const detect = {
    analyze: (contractContent) => {
      let vulnerabilities = [];
  
      // Check for Reentrancy Attack (checks for calls to external contracts)
      if (/\.\s*call\(|\.send\(|\.transfer\(/.test(contractContent)) {
        vulnerabilities.push("Potential Reentrancy Attack: Usage of low-level calls");
      }
  
      // Check for gas limit issues (functions without gas optimization)
      if (/function\s+[a-zA-Z0-9_]+\s*\(.+\)\s*public/.test(contractContent)) {
        vulnerabilities.push("Gas Limit Issue: Public function without gas optimizations.");
      }
  
      // Check for uninitialized storage variables
      if (/\s*storage\s+[a-zA-Z0-9_]+\s*;/.test(contractContent)) {
        vulnerabilities.push("Uninitialized Storage Variable: A storage variable is declared without being initialized.");
      }
  
      // Check for misuse of the 'now' keyword (deprecated)
      if (contractContent.includes("now")) {
        vulnerabilities.push("Deprecation: Use of 'now' instead of 'block.timestamp'");
      }
  
      // Return detected vulnerabilities
      return vulnerabilities;
    }
  };
  
  module.exports = detect;
  