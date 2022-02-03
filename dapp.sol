// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.10 and less than 0.9.0
pragma solidity ^0.8.0;

contract Counter {
    int public count;
    address public owner;

    constructor (int _number) {
        count = _number;
        owner = msg.sender;
    }

    function increese() public {
        count++;
    }
    function degreese() public {
        count--;
    }
    function value() public view returns(int){
        return count;
    }
}