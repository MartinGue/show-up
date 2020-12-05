const Showup = artifacts.require("Showup");
const SafeMath = artifacts.require("SafeMath");


module.exports = function(deployer) {
  deployer.deploy(Showup);
  deployer.deploy(SafeMath);  
};