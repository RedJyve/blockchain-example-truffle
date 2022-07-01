pragma solidity >=0.4.22 <0.9.0;

contract GroceryList {
    struct Item {
        uint id;
        string name;
        bool bought;
    }

    event ItemAdded (
        uint id,
        string name,
        bool bought
    );

    event ItemBought (
        uint id,
        bool bought
    );

    mapping (address => mapping (uint => Item)) public items;
    mapping (address => uint) public itemsCount;

    constructor() {
        addItem("Pepperoni");
    }

    function addItem(string memory _name) public {
        uint itemCount = itemsCount[msg.sender];
        items[msg.sender][itemCount] = Item(itemCount, _name, false);
        emit ItemAdded(itemCount, _name, false);
        itemsCount[msg.sender]++;
    }

    function buyItem(uint _id) public {
        Item storage item = items[msg.sender][_id];
        item.bought = !item.bought;
        emit ItemBought(_id, item.bought);
    }
}