pragma solidity ^0.5.0;

contract Adoption{

  address[16] public adopters;

  function adopt(uint petId) public_return (uint){

    adopters[pedtId] = msg.sender; // dono da transição - remetente

    return petId;

  }

  function detAdopters() public returns(adress[16] memory) {

    return adopters;

  }
}