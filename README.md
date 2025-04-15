# Real Estate DApp

This project is a decentralized real estate marketplace using NFTs (Non-Fungible Tokens). The system allows a buyer to purchase properties (represented as NFTs), which are held in escrow until the buyer's inspection and approval. The seller can list properties, the buyer can deposit escrow amounts, and after inspection and approval from all parties, the sale is finalized.

The contract consists of:

- **Escrow Contract**: Holds the NFT and manages the sale between the buyer and seller.
- **Property Contract**: An ERC721 contract to mint properties as NFTs and represent them on the blockchain.

This system uses **Hardhat** for local blockchain development and **IPFS** for storing property metadata (such as images or documents).

## Table of Contents
1. [Introduction](#real-estate-dapp)
2. [Components](#components)
   - [a. Smart Contracts (On-Chain Logic)](#a-smart-contracts-on-chain-logic)
   - [b. Frontend (User Interface)](#b-frontend-user-interface)
   - [c. Storage (Off-Chain)](#c-storage-off-chain)
3. [Architecture and User Flow Diagram](#architecture-and-user-flow-diagram)
4. [Interactions Flow](#interactions-flow)
   - [1. Minting a Property NFT (Seller)](#1-minting-a-property-nft-seller)
   - [2. Listing Property for Sale (Seller)](#2-listing-property-for-sale-seller)
   - [3. Depositing Escrow Funds (Buyer)](#3-depositing-escrow-funds-buyer)
   - [4. Inspection Process (Inspector)](#4-inspection-process-inspector)
   - [5. Approvals (All Parties)](#5-approvals-all-parties)
   - [6. Finalizing the Sale (Anyone)](#6-finalizing-the-sale-anyone)
   - [7. Cancelling the Sale (Anytime before finalization)](#7-cancelling-the-sale-anytime-before-finalization)
5. [Tech Stack & Dev Tools](#tech-stack--dev-tools)
6. [Steps to Use the Repository](#steps-to-use-the-repository)
   - [1. Clone the Repository](#1-clone-the-repository)
   - [2. Install Dependencies](#2-install-dependencies)
   - [3. Upload Images and Metadata to IPFS](#3-upload-images-and-metadata-to-ipfs)
   - [4. Deploy the Contracts](#4-deploy-the-contracts)
   - [5. Interact with the DApp](#5-interact-with-the-dapp)
7. [License](#license)

## Components

## a. Smart Contracts (On-Chain Logic)
Our project includes two Solidity smart contracts that manage NFT-based real estate transactions through a decentralized escrow system.

### Contracts

#### Property.sol

- ERC-721 compliant contract for minting and managing property NFTs.  
- Each token represents a unique real estate property.  
- Uses ERC721URIStorage to associate metadata (e.g., property details, images) with tokens.  
- Language: Solidity  
- Pattern Used: Standard ERC-721 via OpenZeppelin.

#### Escrow.sol

- Manages escrow logic for property sales involving buyer, seller, lender, and inspector.  
- Ensures trustless flow: inspection, approval, escrow deposit, and finalization.  
- Holds funds and NFT until all conditions are met, then transfers both.  
- Language: Solidity  
- Pattern Used: Role-based access (modifiers), secure handling of funds and tokens.

### Roles

- **Seller**: Lists the property and receives the funds after conditions are met.  
- **Buyer**: Deposits escrow and receives the property NFT.  
- **Inspector**: Approves or rejects property condition.  
- **Lender**: Final approver and optionally provides funding.

## b. Frontend (User Interface)

- **Framework**: Vite + React  
- **Blockchain Interaction**: Using ethers.js for contract interaction and wallet connectivity.  
- **Wallet Support**: MetaMask 

## Features

- View available properties and their metadata.  
- Connect wallet and mint new property NFTs.  
- List NFTs for sale through the escrow contract.  
- Deposit escrow and track inspection status.  
- Finalize or cancel sales depending on inspection outcome.

## c. Storage (Off-Chain)

- **Storage Solution**: IPFS (via services like Pinata or web3.storage)  
- **Purpose**: Hosting property metadata and media (images, documents).  
- **On-Chain Reference**: Metadata URI is stored via `_setTokenURI()` in the Property.sol contract. This URI links each NFT to its off-chain data (e.g., JSON object hosted on IPFS).

## Architecture and User Flow Diagram
![Real Estate Architecture and User Flow](./metadata/images/RealEstateDApp.png) 

## Interactions Flow
Below is a step-by-step overview of how users interact with the platform and how the components (contracts + frontend + off-chain storage) coordinate to facilitate an NFT-based real estate sale.

### 1. Minting a Property NFT (Seller)

- **Action**: Seller connects wallet and uploads property metadata (images, details, location).
- **Frontend**: Sends metadata to IPFS, returns a content URI.
- **Contract Interaction**: `Property.sol → mint(tokenURI)`
- **Result**: A new NFT representing the property is minted and assigned to the seller.

---

### 2. Listing Property for Sale (Seller)

- **Action**: Seller selects an NFT and enters sale details (price, escrow amount, buyer address).
- **Contract Interaction**: `Escrow.sol → list(nftID, price, escrow, buyer)`
- **Effect**:
  - NFT is transferred to Escrow contract.
  - Buyer, price, and escrow details are recorded on-chain.
  - Listing becomes active.

---

### 3. Depositing Escrow Funds (Buyer)

- **Action**: Buyer connects wallet and deposits required escrow amount.
- **Contract Interaction**: `Escrow.sol → depositEscrowAmount(nftID)`
- **Effect**: Escrow funds are held securely in the contract balance.

---

### 4. Inspection Process (Inspector)

- **Action**: Inspector assesses the property and updates the inspection status.
- **Contract Interaction**: `Escrow.sol → updateInspectionStatus(nftID, passed)`
- **Effect**: Inspection result is recorded and determines whether sale can proceed.

---

### 5. Approvals (All Parties)

- **Action**: Buyer, seller, and lender each approve the sale.
- **Contract Interaction**: `Escrow.sol → approveSale(nftID)`
- **Effect**: Contract tracks approvals via a mapping; all parties must approve for the sale to finalize.

---

### 6. Finalizing the Sale 

- **Condition**: All approvals are in place and inspection has passed.
- **Contract Interaction**: `Escrow.sol → finaliseSale(nftID)`
- **Effect**:
  - Seller receives payment (entire contract balance).
  - Buyer receives ownership of the NFT.
  - Listing is closed.

---

### 7. Cancelling the Sale (Anytime before finalization)

- **Condition**: Sale can be cancelled by logic based on inspection status.
- **Contract Interaction**: `Escrow.sol → cancelSale(nftID)`
- **Effect**:
  - If inspection failed, escrow is refunded to buyer.
  - If passed, seller keeps the funds.

## Tech Stack & Dev Tools

| Layer        | Technology / Tool                                 |
|--------------|----------------------------------------------------|
| **Contracts**| Solidity, Hardhat, OpenZeppelin                    |
| **Blockchain**| Localhost (Hardhat)     |
| **Frontend** | Vite + React, Ethers.js                            |
| **Storage**  | IPFS (for metadata & property images)              |
| **Wallets**  | MetaMask (primary)                                 |

## Steps to Use the Repository
### 1. Clone the Repository
Start by cloning the repository to your local machine.

```bash
git clone https://github.com/Srinidhi-Yoganand/RealEstateDApp.git
cd RealEstateDApp
```

### 2. Install Dependencies
Install the necessary dependencies using npm. This will install the required node modules, including Hardhat and OpenZeppelin contracts.
```bash
npm install
```

### 3. Upload Images and Metadata to IPFS

1. **Install IPFS**:
   - Install IPFS by following the guide [here](https://docs.ipfs.tech/install/ipfs-desktop/#windows).
   - After installation, start the IPFS daemon:
     ```bash
     ipfs daemon
     ```

2. **Upload Images to IPFS**:
   - Run the following command to upload images:
     ```bash
     ipfs add /path/to/image.jpg
     ```
   - Note the returned CID (e.g., `QmRuiExGkd...`).

3. **Update Metadata JSON**:
   - Modify the `image` field in the metadata JSON (e.g., `metadata/properties/2.json`) to include the IPFS URL:
     ```json
     "image": "http://localhost:8080/ipfs/<CID>"
     ```

4. **Upload Metadata JSON to IPFS**:
   - Upload the updated JSON files:
     ```bash
     ipfs add metadata/properties/2.json
     ```
   - Note the CID for each JSON file.

5. **Update Deployment Script**:
   - Update the `deploy.js` script with the new IPFS URLs for metadata:
     ```javascript
     await (await property.connect(seller).mint("http://localhost:8080/ipfs/<CID-for-metadata>")).wait();
     ```
### 4. Deploy the Contracts

Before deploying the contracts, make sure to follow these steps:

1. **Compile the Contracts**:
   - First, compile the contracts using Hardhat:
     ```bash
     npx hardhat compile
     ```

2. **Start Local Ethereum Node**:
   - Run a local Ethereum network using Hardhat:
     ```bash
     npx hardhat node
     ```
   - Keep this terminal open as it runs the local network.

3. **Deploy Contracts**:
   - Open another terminal, navigate to your project directory, and run the following command to deploy both the Property and Escrow contracts to the local Ethereum network:
     ```bash
     npx hardhat run scripts/deploy.js --network localhost
     ```

### 5. Interact with the DApp
Once the contracts are deployed, you can interact with them using the frontend. <br>
Steps will be provided soon

## License

This project is licensed under the [MIT License](LICENSE).