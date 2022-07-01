import GroceryListJSON from '../build/contracts/GroceryList.json';
import Web3 from 'web3';
var contracter = require('@truffle/contract');

export const load = async () => {
    await loadWeb3();
    const accountAddress = await loadAccount();
    const { groceryListContract, items } = await loadContract(accountAddress);

    return { accountAddress, groceryListContract, items };
};

const loadItems = async (groceryListContract, accountAddress) => {
    const itemsCount = await groceryListContract.itemsCount(accountAddress);
    const items = [];
    for (var i = 0; i < itemsCount; i++) {
        const item = await groceryListContract.items(accountAddress, i);
        items.push(item);
    }
    return items
};

const loadContract = async (accountAddress) => {
    const contract = contracter(GroceryListJSON);
    contract.setProvider(web3.eth.currentProvider);
    const groceryListContract = await contract.deployed();
    const items = await loadItems(groceryListContract, accountAddress);

    return { groceryListContract, items }
};

const loadAccount = async () => {
    const accountAddress = await web3.eth.getCoinbase();
    return accountAddress;
};

const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
        }
    }
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        web3.eth.sendTransaction({/* ... */});
    }
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};