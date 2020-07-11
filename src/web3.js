import Web3 from 'web3';

// const web3 = new Web3();
// web3.setProvider(new Web3.providers.WebsocketProvider('https://rinkeby.infura.io/v3/7718ad0a31ff4b538a161a9d8e36371b'));
// web3.setProvider(new Web3.providers.WebsocketProvider('ws://rinkeby.infura.io/'));
const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws"));

export default web3;




// const web3  = new Web3.providers.WebsocketProvider
// const web3  = new Web3(window.web3.currentProvider);