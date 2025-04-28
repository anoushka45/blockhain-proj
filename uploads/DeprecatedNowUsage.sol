
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeprecatedNowUsage {
    function getTime() public view returns (uint) {
        return now;
    }
}
