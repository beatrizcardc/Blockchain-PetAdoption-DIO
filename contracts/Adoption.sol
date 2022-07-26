<<<<<<< HEAD
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
=======
pragma solidity ^0.5.0;

contract Adoption {

    address[16] public adopters;

    // Adopting a pet
    function adopt(uint petId) public returns (uint) {
        require(petId >= 0 && petId <= 15);

        adopters[petId] = msg.sender;

        return petId;
    }

    // Retrieving the adopters
    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }
>>>>>>> 5465f83268963c2b655afc77e025bd825923363d

}