// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TrialContract {
    mapping(address => uint256) public balances;
    
    // 🚨 1. Reentrancy Vulnerability 🚨
    function withdrawAll() public {
        require(balances[msg.sender] > 0, "No funds to withdraw");
        (bool success, ) = msg.sender.call{value: balances[msg.sender]}(""); // No reentrancy guard!
        require(success, "Transfer failed");
        balances[msg.sender] = 0; // This should be done before the transfer!
    }

    // 🚨 2. Integer Overflow/Underflow (Before Solidity 0.8) 🚨
    function addBalance(uint256 amount) public {
        balances[msg.sender] += amount; // No safe math checks!
    }

    // 🚨 3. Unprotected Self-Destruct 🚨
    function killContract() public {
        selfdestruct(payable(msg.sender)); // No owner check! Anyone can destroy the contract!
    }

    // 🚨 4. Uninitialized Storage Pointers 🚨
    struct User {
        uint256 amount;
        bool exists;
    }
    mapping(address => User) users;
    
    function createUser() public {
        User storage newUser;
        newUser.amount = 100; // Uninitialized storage pointer leads to overwriting random storage slot!
    }

    // 🚨 5. Tx.origin Authentication Flaw 🚨
    address owner;
    constructor() {
        owner = msg.sender;
    }

    function onlyOwner() public {
        require(tx.origin == owner, "Not owner"); // Attacker can use a contract to bypass this!
    }
}
