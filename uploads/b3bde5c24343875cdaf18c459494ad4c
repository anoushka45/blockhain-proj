// SPDX-License-Identifier: MIT
pragma solidity ^0.4.25;

contract OverflowUnderflowDemo {
    uint8 public smallNumber = 255; // Max value for uint8 (0 to 255)
    uint8 public anotherNumber = 0;  // Min value for uint8 (0 to 255)

    // Causes an overflow (255 + 1 wraps back to 0)
    function causeOverflow() public {
        smallNumber += 1; // Overflows to 0
    }

    // Causes an underflow (0 - 1 wraps back to 255)
    function causeUnderflow() public {
        anotherNumber -= 1; // Underflows to 255
    }
}
