const ZubToken = artifacts.require("ZubToken.sol");
const ZubTokenSale = artifacts.require("./ZubTokenSale.sol");


module.exports = function(deployer) {
  deployer.deploy(ZubToken, 1000000).then(function(){
    // token price is in 0.01 ether
    var tokenPrice = 1000000000000000;
    return deployer.deploy(ZubTokenSale, ZubToken.address, tokenPrice);
  });
  
};
