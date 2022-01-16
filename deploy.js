// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
require('dotenv').config();

// console.log(
//     process.env.TEST_MNEUMONIC,
//     process.env.NETWORK_LINK
// );

const provider = new HDWalletProvider(
    process.env.TEST_MNEUMONIC,
    process.env.NETWORK_LINK
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(`accounts[0]`, accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi There!'] })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to:', result.options.address);

    provider.engine.stop();
};

deploy();