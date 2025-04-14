// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
}

contract Escrow{
    address public lender;
    address public inspector;
    address payable public seller;
    address public nftAddress;

    mapping (uint256=>bool) public isListed;
    mapping (uint256=>uint256) public purchasePrice;
    mapping (uint256=>uint256) public escrowAmount;
    mapping (uint256=>address) public buyer;

    constructor(address _lender, address _inspector, address payable  _seller, address _nftAddress){
        lender=_lender;
        inspector=_inspector;
        seller=_seller;
        nftAddress=_nftAddress;
    }

    modifier onlySeller(){
        require(msg.sender==seller, "Only seller can call this method");
        _;
    }

    modifier onlyBuyer(uint256 nftID){
        require(msg.sender==buyer[nftID], "Only buyer can call this method");
        _;
    }

    function list(uint256 nftID, uint256 _purchasePrice, uint256 _escrowAmount, address _buyer) public payable onlySeller{
        IERC721(nftAddress).transferFrom(msg.sender, address(this), nftID);
        isListed[nftID]=true;
        purchasePrice[nftID]=_purchasePrice;
        escrowAmount[nftID]=_escrowAmount;
        buyer[nftID]=_buyer;
    }

    function depositEscrowAmount(uint256 nftID) public payable onlyBuyer(nftID){
        require(msg.value>=escrowAmount[nftID]);
    }

    function getBalance() public view returns (uint256){
        return address(this).balance;
    }

    receive() external payable { }
}