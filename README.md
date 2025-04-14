# Real Estate DApp

This project is a decentralized real estate marketplace using NFTs (Non-Fungible Tokens). The system allows a buyer to purchase properties (represented as NFTs), which are held in escrow until the buyer's inspection and approval. The seller can list properties, the buyer can deposit escrow amounts, and after inspection and approval from all parties, the sale is finalized.

The contract consists of:

- **Escrow Contract**: Holds the NFT and manages the sale between the buyer and seller.
- **Property Contract**: An ERC721 contract to mint properties as NFTs and represent them on the blockchain.

This system uses **Hardhat** for local blockchain development and **IPFS** for storing property metadata (such as images or documents).

## Components

### 1. **Property Contract (ERC721)**
   - The **Property** contract allows minting of NFTs that represent real estate properties.
   - Each property is uniquely identified by an NFT and contains metadata, such as its URI, which could link to further property details.
   - **Minting**: New properties are minted by the seller with a specific URI for each property.

### 2. **Escrow Contract**
   - The **Escrow** contract manages the process of buying and selling properties.
   - The **Lender**, **Inspector**, **Seller**, and **Buyer** are the main roles interacting with this contract.
   - **Listing**: The seller lists properties for sale, specifying the purchase price and escrow amount.
   - **Deposit**: The buyer deposits the agreed-upon escrow amount into the contract.
   - **Inspection**: The inspector updates the status of the property inspection.
   - **Approvals**: Both the seller and buyer, along with the lender, must approve the sale before it can proceed.
   - **Finalization**: Once the sale is approved, the escrowed funds are transferred to the seller, and the property NFT is transferred to the buyer.
   - **Cancellation**: If the inspection fails, the funds are returned to the buyer; otherwise, they are transferred to the seller.

## Flow of a Transaction:
1. The **seller** mints and lists a property for sale, specifying the price and escrow amount.
2. The **buyer** deposits the escrow amount to the contract.
3. The **inspector** verifies the condition of the property.
4. All parties approve the sale.
5. Upon approval, the property is transferred to the buyer, and funds are transferred to the seller.

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
### 5. Deploy the Contracts

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

## Interact with the DApp
Once the contracts are deployed, you can interact with them using the frontend. 

### Crowd Funding DApp Frontend (Coming Soon)
Please refer to the upcoming frontend repository to clone and run the DApp once it’s ready. The repository link and steps will be provided here.
Stay tuned for further updates!

## License

This project is licensed under the [MIT License](LICENSE).