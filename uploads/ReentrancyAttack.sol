
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReentrancyAttack {
    function attack(address payable target) public {
        target.call{value: 1 ether}("");
    }
}
