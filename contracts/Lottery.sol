pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    address public winter;
    mapping(address=>uint) lotterys;
    event UpdateEvent();
    function  Lottery()public {
        //    constructor ()public {//新版本修改为这样
        manager = msg.sender;
    }
    function getManager() public view returns (address) {
        return manager;
    }
    //投注彩票
    //别人给你钱，需要调用payable
    function enter() public payable {
        require(msg.value == 1 ether);
        lotterys[msg.sender] =  lotterys[msg.sender] +1;
        players.push(msg.sender);
        emit UpdateEvent();
    }
    //返回所有的投注彩票的人
    function getAllPayers() public view returns (address[]) {
        return players;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
        /* return this.balance; */
    }
    function getWinter() public view returns (address) {
        return winter;
    }

    function getPlayerCount() public view returns (uint) {
        return players.length;
    }

    function random() private view returns (uint) {
        //block.difficulty//区块难度，由全网算力决定
        return uint(keccak256(block.difficulty, now, players));
    }
    //你给别人钱，不需要调用payable
    function pickWinnter() public onlyManagerCanCall {
        uint index = random() % players.length;
        winter = players[index];
        //初始数组
        players = new address[](0);
        for (uint i = 0; i < players.length; i++) {
            lotterys[players[i]] = 0;
        }
        winter.transfer(getBalance());
        UpdateEvent();
    }

    function refund() public payable onlyManagerCanCall {
        for (uint i = 0; i < players.length; i++) {
            players[i].transfer(1 ether);
            lotterys[players[i]] = 0;
        }
        players = new address[](0);
        //TODO 清除winter
        winter = 0x0;//??
        UpdateEvent();
    }
    function getMyLotteryCount(address cuser) public view returns(uint){
        return lotterys[cuser];
    }
    modifier onlyManagerCanCall() {
        require(msg.sender == manager);
        _;
    }
}