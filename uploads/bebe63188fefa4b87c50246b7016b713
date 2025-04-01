pragma solidity ^0.8.0;

contract VulnerableContract {
    mapping(address => uint) public balances;

    // Reentrancy Vulnerability
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        // Potential reentrancy attack vulnerability
        payable(msg.sender).transfer(amount);
        balances[msg.sender] -= amount;
    }
}
