pragma solidity ^0.5.0;  //o erro não tem problema

//estrutura do contrato - Smart Contracts -
contract Adoption{

  address[16] public adopters;
//função para registrar a adoção
  function adopt(uint petId) public returns (uint){

    adopters[petId] = msg.sender; // msg é quem escreve na blockchain - dono da transição - remetente

    return petId;
//essa função permitirá a adoção dos pets
  }
//função para obter a lista de usuarios adotantes - que em lugar do nome é o endereço da criptomoeda
  function getAdopters() public returns (address[16] memory) {
//memory guarda os dados no contrato
    return adopters;

  }

}