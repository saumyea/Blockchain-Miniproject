# Student Document Storage & Verification System

This project utilizes blockchain technology to securely store and verify student documents, ensuring their immutability and transparency. By leveraging smart contracts on the Ethereum blockchain, the system stores cryptographic hashes of documents, allowing users to verify the authenticity of student records without compromising privacy.

## Features

- **Document Hashing:** Uses SHA-256 hashing to protect sensitive document data.
- **Smart Contracts:** Implements Solidity-based smart contracts to store document hashes immutably on the Ethereum blockchain.
- **MetaMask Integration:** Uses MetaMask for wallet management and transaction signing.
- **Decentralized Application (DApp):** Provides a web-based frontend for users to upload and verify documents.
- **Blockchain Simulation:** Local testing is facilitated via Ganache, with final deployment to the Sepolia Testnet.

## GitHub Pages Link
[Student Record Uploading & Verification](https://saumyea.github.io/Blockchain-Miniproject/)

## Project Overview

This system addresses the issue of document forgery and credential fraud, particularly within academic institutions. Traditional verification systems are often slow, prone to tampering, and rely on centralized databases. By decentralizing storage on the Ethereum blockchain, this project ensures that records are immutable, publicly verifiable, and secure against unauthorized access.

## Methodology

1. **Document Upload:** 
   - Users upload their document via the web interface. 
   - The system computes the document's hash using SHA-256, which is then stored on the blockchain.

2. **Document Verification:** 
   - For verification, users re-upload the document. 
   - The system computes a new hash and compares it with the stored hash on the blockchain to determine the document's authenticity.

## Technologies Used

- **Solidity:** Smart contract development.
- **Remix IDE:** For writing, compiling, and deploying smart contracts.
- **HTML, CSS, JavaScript:** Frontend development for user interaction.
- **Ethers.js:** Communicating with the Ethereum blockchain.
- **CryptoJS:** SHA-256 hashing algorithm for document content.
- **MetaMask:** Wallet management and transaction signing.
- **Ganache:** Local blockchain simulation for development and testing.
- **Sepolia Testnet:** Public Ethereum testnet for deployment.

## Setup Steps: Deploy Blockchain Project

### For Ganache (Local Testing)

1. Compile `contract.sol` in **Remix IDE**.
2. Connect **MetaMask** to **Ganache** (with test ETH).
3. Deploy the contract and copy the **contract address** and **ABI**.
4. Add the contract address and ABI to `config.js`.

### For Sepolia Testnet (Final Deployment)

1. Switch **MetaMask** to **Sepolia Testnet**.
2. Get Sepolia ETH from the **Chainlink faucet**.
3. Deploy the contract in **Remix** using the Sepolia-connected account.
4. Update the contract address and ABI in `config.js`.
