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
      const normalizedContent = contractContent.replace(/\s+/g, ' ');

      if (/unsafe\s*\{[^}]*\}/g.test(normalizedContent)) {
        vulnerabilities.push("Rust: Unsafe block detected. Review for potential memory issues.");
      }
      if (/\bunwrap\s*\(/g.test(normalizedContent)) {
        vulnerabilities.push("Rust: Potential panic risk - unwrap() usage detected.");
      }
      if (/\bexpect\s*\(/g.test(normalizedContent)) {
        vulnerabilities.push("Rust: Potential panic risk - expect() usage detected.");
      }

    } else if (fileType === 'vy') {
      // Vyper vulnerability checks
      if (/selfdestruct\(/.test(contractContent)) {
        vulnerabilities.push("Vyper: Usage of selfdestruct detected, which can be dangerous.");
      }
      if (/raw_call\(/.test(contractContent)) {
        vulnerabilities.push("Vyper: Raw call detected. Ensure proper checks are in place.");
      }

    } else if (fileType === 'move') {
      // Move (Aptos/Sui) vulnerability checks
      if (/0x[0-9a-fA-F]+::/.test(contractContent)) {
        vulnerabilities.push("Move: Hardcoded address detected. Prefer dynamic linking.");
      }
      if (/\bassert\s*\(/.test(contractContent)) {
        vulnerabilities.push("Move: Assert usage detected. Might cause transaction failure.");
      }

    } else if (fileType === 'ts') {
      // AssemblyScript (for NEAR) checks
      if (/env\.log\(/.test(contractContent)) {
        vulnerabilities.push("AssemblyScript: Logging information detected. Avoid leaking sensitive data.");
      }
      if (/context\.sender\s*==\s*context\.predecessor/.test(contractContent)) {
        vulnerabilities.push("AssemblyScript: Potential issue with improper sender checks.");
      }

    } else {
      vulnerabilities.push("Unsupported file type or no checks defined for this type.");
    }

    return vulnerabilities;
  }
};

module.exports = detect;
