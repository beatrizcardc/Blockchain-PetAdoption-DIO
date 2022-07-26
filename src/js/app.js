App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    // Load pets. Carrega os pets
    $.getJSON("../pets.json", function (data) {
      var petsRow = $("#petsRow");
      var petTemplate = $("#petTemplate");

      for (i = 0; i < 12; i++) {
        petTemplate.find(".panel-title").text(data[i].name);
        petTemplate.find("img").attr("src", data[i].picture);
        petTemplate.find(".pet-breed").text(data[i].breed);
        petTemplate.find(".pet-age").text(data[i].age);
        petTemplate.find(".pet-location").text(data[i].location);
        petTemplate.find(".btn-adopt").attr("data-id", data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function () {
    //integra Blockchain Ethereum com front-end JS
    //verifica a instalação e inicia  comunicação com o metamask
    //permite a interação da aplicação no desktop com o contrato
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        //request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        //user denied account access...
        console.error("User denied account access");
      }
    }
    //Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }
    web3 = new Web3(App.webProvider);

    return App.initContract();
  },

  //inicializar o smart contract

  initContract: function () {
    $.getJSON("Adoption.json", function (data) {
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AoptionArtifact);

      App.contracts.Adoption.setProvider(App.web3Provider);

      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".btn-adopt", App.handleAdopt);
  },

  markAdopted: function () {
    var adoptionInstance;
    App.contracts.Adoption.deployed()
      .then(function (instance) {
        adoptionInstance = instance;

        return adoptionInstance.getAdopters.call();
      })
      .then(function (adopters) {
        for (i = 0; i < adopters.lenght; i++) {
          if (adopters[i] !== "0x0000000000000000000000000000000000000000") {
            $(".panel1-pet")
              .eq(i)
              .find("button")
              .text("Success")
              .attr("disable", true);
          }
        }
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data("id"));

    var adoptionInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed()
        .then(function (instance) {
          adoptionInstance = instance;

          // Execute adopt as a transaction by sending account
          return adoptionInstance.adopt(petId, { from: account });
        })
        .then(function (result) {
          return App.markAdopted();
        })
        .catch(function (err) {
          console.log(err.message);
        });
    });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
