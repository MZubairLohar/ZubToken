pragma solidity >=0.4.21 <0.7.0;
contract ZubToken {
    //name
    string public name = "Zub Token";
    //symbol
    string public symbol = "Z";
    //standard
    string public standard = "Zub Token v1.0";

    uint256 public totalSupply; //State variable for total Supply of tokens

    event Transfer(address _from, address _to, uint256 _value);
    event Approval(address _owner, address _to, uint256 _value);

    mapping(address => uint256) public balanceOf; // mapping for key address and balance

    mapping(address => mapping(address => uint256)) public allowance; // mapping for key address and balance

    constructor(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
        //allocate initial Supply
    }

    function transfer(address _to, uint256 _value)
        public
        payable
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value,'balance should be more then sent value');
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    function approved(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    function transferFrom(address _from, address _to, uint256 _value)public returns(bool success){
       require(_value <= balanceOf[_from], 'not sufficient blance');
       require(_value <= allowance[_from][msg.sender],'allowance should be maintained');
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

       return(true); 
       

    }
}
