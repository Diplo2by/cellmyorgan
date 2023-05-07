const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const OrganListing = await hre.ethers.getContractFactory("OrganListing");
  const organListing = await OrganListing.deploy();
  await organListing.deployed();
  console.log("OrganListing deployed to:", organListing.address);

  const Organ = await hre.ethers.getContractFactory("Organ");
  const organ = await Organ.deploy(organListing.address);
  await organ.deployed();
  console.log("Organ contract deployed to:", organ.address);

  fs.writeFileSync('./config.js', `
  export const organListingAddress = "${organListing.address}";
  export const organAddress = "${organ.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
