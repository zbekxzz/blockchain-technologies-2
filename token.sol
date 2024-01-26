// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract token is ERC20 {
    constructor() ERC20("AITU_Bekbolat", "UBQ") {
        _mint(msg.sender, 2000);
    }
    
    function getLastTransactionTimestamp() external view returns (uint256) {
        return block.timestamp;
    }

    function getTransactionSender() external view returns (address) {
        return msg.sender;
    }

    function getTransactionReceiver() external view returns (address) {
        return address(this);
    }
}