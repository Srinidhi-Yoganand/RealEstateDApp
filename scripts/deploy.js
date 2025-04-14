const { ethers } = require("hardhat");

function tokens(n) {
  return ethers.parseUnits(n.toString(), "ether");
}

async function main() {
  const [buyer, seller, inspector, lender] = await ethers.getSigners();

  const Property = await ethers.getContractFactory("Property");
  const property = await Property.deploy();

  await property.waitForDeployment?.();

  const propertyAddress = property.target || property.address; 

  console.log(`✅ Deployed Property Contract at: ${propertyAddress}\n`);

  console.log(`🏘️ Minting 3 properties...\n`);

  await (await property.connect(seller).mint("http://localhost:8081/ipfs/QmYtaB448WNN3zmXdkbi4WVLc3NhVP73ZSTzRjs6SDZokS")).wait();
  await (await property.connect(seller).mint("http://localhost:8081/ipfs/QmQbRXdLcCiNFiiNhhsLJ2QmrkxWonNacdZ5biR9ZnfbeN")).wait();
  await (await property.connect(seller).mint("http://localhost:8081/ipfs/Qme4fUfNRcoDPTAFp3vsn9ii3pub8FVxp4boa517uTu1zx")).wait();

  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(lender.address, inspector.address, seller.address, propertyAddress);

  await escrow.waitForDeployment?.();

  const escrowAddress = escrow.target || escrow.address;
  console.log(`✅ Deployed Escrow Contract at: ${escrowAddress}\n`);

  console.log(`📋 Listing 3 properties...\n`);

  for (let i = 1; i <= 3; i++) {
    await (await property.connect(seller).approve(escrowAddress, i)).wait();
  }

  await escrow.connect(seller).list(1, tokens(20), tokens(10), buyer.address);
  await escrow.connect(seller).list(2, tokens(15), tokens(5), buyer.address);
  await escrow.connect(seller).list(3, tokens(10), tokens(5), buyer.address);


  console.log(`Finished listing properties.`);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
