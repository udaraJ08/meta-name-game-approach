const Zkoopa = artifacts.require("./Zkoopa.sol");

contract("Zkoopa", accounts => {

  let contract;
  before(async () => {
    contract = await Zkoopa.deployed();
  })

  it("MINT testing", async ()=> {
    contract.mint("udara");
  })
  it("MINT testing", async ()=> {
    contract.mint("udara");
  })
});
