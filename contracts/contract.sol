// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract DocumentVerification {

    // Mapping to store document hashes
    mapping(bytes32 => bool) private documentHashes;

    // Event to log when a document hash is stored
    event DocumentHashStored(bytes32 indexed documentHash);

    // Function to store the hash of a document on the blockchain
    function storeHash(bytes32 documentHash) external {
        require(!documentHashes[documentHash], "Hash already stored.");
        
        // Store the document hash in the mapping
        documentHashes[documentHash] = true;

        // Emit an event to notify that the hash has been stored
        emit DocumentHashStored(documentHash);
    }

    // Function to verify if a document's hash exists on the blockchain
    function verifyHash(bytes32 documentHash) external view returns (bool) {
        return documentHashes[documentHash];
    }
}
