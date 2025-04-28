
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LowLevelSend {
    address payable public receiver;

    function sendEther() public payable {
        receiver.send(msg.value);
    }
}
