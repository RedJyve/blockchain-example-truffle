const Migrations = artifacts.require("Migrations");
const GroceryList = artifacts.require("GroceryList");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(GroceryList);
};
