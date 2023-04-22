// const { expect } = require("chai");
//const { ethers} = require("ethers")

describe("OrganDonation", function () {
  it("Should create and execute Organ Listing and donations", async function () {
    const OrganDono = await ethers.getContractFactory("OrganListing");
    const dono = await OrganDono.deploy();
    await dono.deployed();
    const Listingaddress = dono.address;
    console.log(Listingaddress);

    const Organ = await ethers.getContractFactory("Organ");
    const organ = await Organ.deploy(Listingaddress);

    await organ.deployed();
    const organContractAddress = organ.address;

    await organ.createToken("SellMyOrgan.org");
    await organ.createToken("SellMyOrgan.org2");
    await organ.createToken("SellMyOrgan.org3");

    await dono.ListOrgan(organContractAddress, 1, "Kidney","A+");
    await dono.ListOrgan(organContractAddress, 2, "Liver","B+");
    await dono.ListOrgan(organContractAddress, 3, "Heart","C+");

    const [_, recepientAddress] = await ethers.getSigners();

    await dono.connect(recepientAddress).AllocateOrgan(organContractAddress, 1);

    const items = await dono.fetchOrganItems();
    console.log("items: ", items);
  });
});
