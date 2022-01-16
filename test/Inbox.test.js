// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    console.log(`accounts`, accounts)
    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth
        .Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    // test for the contract to be deployed
    // test for retrieving of message
    // test for setting of message
    it('deploys a contract', () => {
        // assert.ok checks to see if it's a truthy value
        assert.ok(inbox.options.address);
    })
    it('sets new message', async () => {
        const message = 'Test Message!';
        await inbox.methods.setMessage(message).send({ from: accounts[0], gas: '1000000' });
        const newMessage = await inbox.methods.message().call();
        console.log(`newMessage`, newMessage)
        assert.equal(message, newMessage);
    });
});

// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom'
//     }
// }

// let car;
// beforeEach(() => {
//     car = new Car();
// });

// describe('Car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     });
// });

