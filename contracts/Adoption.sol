pragma solidity ^0.5.0;  //o erro não tem problema

//estrutura do contrato
contract Adoption{

  address[16] public adopters;

  function adopt(uint petId) public returns (uint){

    adopters[petId] = msg.sender; // dono da transição - remetente

    return petId;

  }

  function getAdopters() public returns (address[16] memory) {

    return adopters;

  }

}