export const contractAddress = '0x5Bed7787f3d9bb9A07cbcc170c064Dd9948bC10A';  // Replace with your contract's address

export const contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "documentHash",
                "type": "bytes32"
            }
        ],
        "name": "DocumentHashStored",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "documentHash",
                "type": "bytes32"
            }
        ],
        "name": "storeHash",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "documentHash",
                "type": "bytes32"
            }
        ],
        "name": "verifyHash",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
