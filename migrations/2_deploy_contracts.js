var Adoption = artifacts.require("Adoption");

//subindo smart contract na blockchain
module.exports = function (deployer) {
  deployer.deploy = Adoption;
};
//migrar para a blockchain (Ganache) com truffle migrate
