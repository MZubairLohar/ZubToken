const ZubTokenSale = artifacts.require("./ZubTokenSale.sol");

contract(
  "ZubTokenSale",
  function(accounts) {
    var TokenInstance;
    var TokenSaleInstance;
    var tokenPrice = 1000000000000000; //in wey
    var admin = accounts[0];
    var buyer = accounts[1];
    var tokensAvailable = 750000; //750000
    var numberOfToken;
    it("initializes the contract with the correct values", function() {
      return ZubTokenSale.deployed()
        .then(function(instance) {
          TokenSaleInstance = instance;
          return TokenSaleInstance.address;
        })
        .then(function(address) {
          assert.notEqual(address, 0x0, "has not contract address");
          return TokenSaleInstance.tokenContract();
        })
        .then(function(address) {
          assert.notEqual(address, 0x0, "has not contract address");
          return TokenSaleInstance.tokenPrice();
        })
        .then(function(price) {
          assert.equal(price, tokenPrice, "token price is correct");
        });
    });
    it("fecilitates the token buying", function() {
      return ZubTokenSale.deployed()
        .then(function(instance) {
          TokenInstance = instance;
          numberOfToken = 10; // i put only 1 at first
          return TokenSaleInstance.buyingToken(numberOfToken, {
            from: buyer,
            value: numberOfToken * tokenPrice
          });
        }).then(function(receipt) {
          assert.equal(receipt.logs.length, 1, "trigger one event");
          assert.equal(receipt.logs[0].event,"Sell",'should be the "Sell"event');
          assert.equal(receipt.logs[0].args._buyer,buyer,"logs the account that purchased the tokens");
          assert.equal(receipt.logs[0].args._amount,numberOfTokens,"logs the number of tokens purchased");
          return tokenSaleInstance.tokensSold();
        }).then(function(amount) {assert.equal(amount.toNumber(),numberOfTokens,"increments the number of tokens sold");
          return tokenInstance.balanceOf(buyer);
        }).then(function(balance) {
          assert.equal(balance.toNumber(), numberOfTokens);
          return tokenInstance.balanceOf(tokenSaleInstance.address);
        }).then(function(balance) {
          assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
          // Try to buy tokens different from the ether value
          return tokenSaleInstance.buyTokens(numberOfTokens, {
            from: buyer,
            value: 1
          });
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf("revert") >= 0,"msg.value must equal number of tokens in wei");
          return tokenSaleInstance.buyingTokens(800 , { //800
            from: buyer,
            value: numberOfTokens * tokenPrice});
        })
        .then(assert.fail)
        .catch(function(error) {
          //assert(error.message.indexOf("revert") >= 0, 'cannot purchase more tokens than available');
        });
    });
    it('ends the token sale',function() {
    return ZubTokenSale.deployed().then(function(instance) {
        tokenInstance = instance;
        return ZubTokenSale.deployed();
      }).then(function(instance) {
        tokenSaleInstance = instance;
        return tokenSaleInstance.endSale({ from: admin });
      }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf("revert" >= 0,'must be admin to end sale'));
    //     return tokenSaleInstance.tokenPrice();
  //         return tokenSaleInstance.endSale({ from: admin});
    //  }).then(function(receipt){
    //  // return TokenInstance.balanceOf(admin);
    //   }).then(function(balance){
    //    assert.equal(balance.toNumber(), 999990,'return all unsold return to admin');
    //    balance = web3.eth.getBalance(tokenSaleInstance.address);
    //    assert.equal(balance, 0);
    //     }).then(function(price){
    //       assert.equal(price.toNumber(), 0 , 'token price was reset ');
        });
 });
});

