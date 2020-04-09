pragma solidity >=0.4.21 <0.7.0;
import "./ZubToken.sol";


contract ZubTokenSale {
    address payable admin =  0x3906A021ACC2f4791ac63dE654C0Ba3784f1C56e ;
    ZubToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public numberOfTokens;
    uint256 public tokensSold;
    event Sell(address _buyer, uint256 _amount);

    constructor(ZubToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x, "multiplication");
    }

    function buyingToken(uint256 _numberOfTokens) public payable {
        require(
            msg.value == multiply(_numberOfTokens, tokenPrice),
            "masg value should be equal to mul fun"
        );
        require(
            tokenContract.balanceOf(admin) >= _numberOfTokens,
            "contract blnc should be no of tokens"
        );
        require(
            tokenContract.transfer(msg.sender, _numberOfTokens),
            "msg sender can send token"
        );
        tokensSold += _numberOfTokens;
        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public {
        require(msg.sender == admin,'only admin can be master');
        require(tokenContract.transfer(admin, tokenContract.balanceOf(admin)),"trasnfer & blance");
        //admin.transfer(address(this).balance);
          selfdestruct(admin);
            }

}
