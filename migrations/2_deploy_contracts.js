var ZombieFactory = artifacts.require("./ZombieFactory.sol");
var ZombieFeeding = artifacts.require("./ZombieFeeding.sol");
var ZombieHelper = artifacts.require("./ZombieHelper.sol");
var ZombieAttack = artifacts.require("./ZombieAttack.sol");
var ZombieOwnership = artifacts.require("./ZombieOwnership.sol");

module.exports = function(deployer) {
  deployer.deploy(ZombieFactory);
  deployer.deploy(ZombieFeeding);
  deployer.deploy(ZombieHelper);
  deployer.deploy(ZombieAttack);
  deployer.deploy(ZombieOwnership);
};