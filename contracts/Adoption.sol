pragma solidity ^0.5.0;  //o erro não tem problema

//estrutura do contrato - Smart Contracts -
contract Adoption{

  address[16] public adopters;

  function adopt(uint petId) public returns (uint){

    adopters[petId] = msg.sender; // msg é quem escreve na blockchain - dono da transição - remetente

    return petId;
//essa função permitirá a adoção dos pets
  }

  function getAdopters() public returns (address[16] memory) {
//memory guarda os dados no contrato
    return adopters;

  }

}