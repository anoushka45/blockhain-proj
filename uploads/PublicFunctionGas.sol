
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PublicFunctionGas {
    function wasteGas(uint x) public returns (uint) {
        return x * 2;
    }
}
