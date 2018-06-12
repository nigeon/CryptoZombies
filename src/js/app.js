var cryptoZombies;
var userAccount;

function startApp() {
  $.getJSON('ZombieOwnership.json', function(data) {
    var ZombieOwnershipArtifact = data;    
    cryptoZombies = TruffleContract(ZombieOwnershipArtifact);
    cryptoZombies.setProvider(web3js);

    var accountInterval = setInterval(function() {
      // Check if account has changed
      if (web3.eth.accounts[0] !== userAccount) {
        userAccount = web3.eth.accounts[0];
        // Call a function to update the UI with the new account
        getZombiesByOwner(userAccount).then(displayZombies);
      }
    }, 100);
  });
}

function displayZombies(ids) {
  $("#zombies").empty();
  for (id of ids) {
    // Look up zombie details from our contract. Returns a `zombie` object
    getZombieDetails(id.toNumber())
    .then(function(zombie) {

      // Using ES6's "template literals" to inject variables into the HTML.
      // Append each one to our #zombies div
      $("#zombies").append(`<div class="zombie">
        <ul>
          <li>Name: ${zombie[0].toString()}</li>
          <li>DNA: ${zombie[1].toString()}</li>
          <li>Level: ${zombie[2].toNumber()}</li>
          <li>Wins: ${zombie[3].toNumber()}</li>
          <li>Losses: ${zombie[4].toNumber()}</li>
          <li>Ready Time: ${zombie[5].toString()}</li>
        </ul>
      </div>`);
    });
  }
}

function createRandomZombie(name) {
  // This is going to take a while, so update the UI to let the user know
  // the transaction has been sent
  $("#txStatus").text("Creating new zombie on the blockchain. This may take a while...");

  cryptoZombies.deployed().then(function(instance){
    return instance.createRandomZombie(name, { from: userAccount });
  }).then(function(receipt){
    $("#txStatus").text("Successfully created " + name + "!");

    // Transaction was accepted into the blockchain, let's redraw the UI
    getZombiesByOwner(userAccount).then(displayZombies);
  }).catch(function(err) {
    console.log(err.message);
  });
}

/*
function feedOnKitty(zombieId, kittyId) {
  $("#txStatus").text("Eating a kitty. This may take a while...");
  return CryptoZombies.methods.feedOnKitty(zombieId, kittyId)
  .send({ from: userAccount })
  .on("receipt", function(receipt) {
    $("#txStatus").text("Ate a kitty and spawned a new Zombie!");
    getZombiesByOwner(userAccount).then(displayZombies);
  })
  .on("error", function(error) {
    $("#txStatus").text(error);
  });
}

function levelUp(zombieId) {
  $("#txStatus").text("Leveling up your zombie...");
  return CryptoZombies.methods.levelUp(zombieId)
  .send({ from: userAccount, value: web3.utils.toWei("0.001", "ether") })
  .on("receipt", function(receipt) {
    $("#txStatus").text("Power overwhelming! Zombie successfully leveled up");
  })
  .on("error", function(error) {
    $("#txStatus").text(error);
  });
}
*/
function getZombieDetails(id) {
  return new Promise(function (resolve, reject) {
    cryptoZombies.deployed().then(function(instance){
      instance.zombies.call(id).then(function(zombie){
        resolve(zombie);
      });
    });
  });
}
/*
function zombieToOwner(id) {
  return cryptoZombies.methods.zombieToOwner(id).call()
}
*/
function getZombiesByOwner(owner) {
  return new Promise(function (resolve, reject) {
    cryptoZombies.deployed().then(function(instance){
      instance.getZombiesByOwner.call(owner)
        .then(function(zombies){
          resolve(zombies);
        });
    });
  });
}

window.addEventListener('load', function() {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = web3.currentProvider;
  } else {
    // Handle the case where the user doesn't have Metamask installed
    // Probably show them a message prompting them to install Metamask
    alert('Install Metamask!')
  }
  web3 = new Web3(web3js);

  // Now you can start your app & access web3 freely:
  startApp();

  $('#createRandomZombie').on('click',function(){
    createRandomZombie("RandomZombie" + Math.floor((Math.random() * 666) + 1));
  });
});