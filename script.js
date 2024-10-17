import { contractAddress, contractABI } from './config.js';

let generatedHash = '';  // Store the generated hash

async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({
                "method": "eth_requestAccounts",
                "params": [],
            });
            console.log("Connected account:", accounts[0]);
            document.getElementById('status').innerText = `Connected: ${accounts[0]}`;
        } catch (error) {
            console.error("User rejected the request.", error);
        }
    } else {
        alert('MetaMask is not installed. Please install MetaMask to use this feature.');
    }
}

// Submit document and generate hash
function submitDocument() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];  // Get the first file selected

    if (!file) {
        document.getElementById('hashOutput').innerText = 'No file selected.';
        return;
    }

    generatedHash = '';  // Reset hash
    document.getElementById('hashOutput').innerText = '';  // Clear output

    const contentType = file.type;
    let extension;

    // Check the content type and determine the file extension
    if (contentType === 'application/pdf') {
        extension = 'pdf';
    } else if (contentType.startsWith('image/')) {
        extension = contentType.split('/')[1];
    } else {
        document.getElementById('hashOutput').innerText = 'Unsupported file type.';
        return;
    }

    // Read file content and create a hash
    const reader = new FileReader();
    reader.onload = function(event) {
        const arrayBuffer = event.target.result;
        const binaryStr = new Uint8Array(arrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), '');  // Convert ArrayBuffer to binary string
        generatedHash = createSignature(binaryStr);
        document.getElementById('hashOutput').innerText += `\nSHA-256 Hash: ${generatedHash}`;
    };
    reader.readAsArrayBuffer(file);  // Use readAsArrayBuffer instead of readAsBinaryString
}

// Function to create a SHA-256 hash of the file content
function createSignature(fileContent) {
    const hash = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(fileContent)).toString();
    return hash;
}

// Send hash to contract using Ethers.js
function sendHashToContract() {
    if (!generatedHash) {
        alert('No hash generated. Please upload a file and generate the hash first.');
        return;
    }

    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const hashedData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(generatedHash));

        contract.storeHash(hashedData).then(function(tx) {
            return tx.wait();
        }).then(function() {
            console.log("Hash sent to contract.");
            alert("Hash successfully stored on blockchain.");
        }).catch(function(error) {
            console.error("Transaction error:", error);
        });
    } else {
        console.log("MetaMask not found.");
    }
}

// Verify document by taking a file, hashing it, and checking on blockchain
function verifyDocumentFromContract() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];  // Get the first file selected

    if (!file) {
        alert('No file selected. Please upload a file to verify.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const arrayBuffer = event.target.result;
        const binaryStr = new Uint8Array(arrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), '');  // Convert ArrayBuffer to binary string
        const fileHash = createSignature(binaryStr);  // Hash the file content

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const hashedData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(fileHash));

            contract.verifyHash(hashedData).then(function(result) {
                if (result) {
                    console.log("Verification successful.");
                    alert("Document is verified. Hash exists on blockchain.");
                } else {
                    console.log("Verification unsuccessful.");
                    alert("Document verification failed. Hash does not exist on blockchain.");
                }
            }).catch(function(error) {
                console.log("Verification error:", error);
            });
        } else {
            console.log("MetaMask not found.");
        }
    };

    reader.readAsArrayBuffer(file);  // Use readAsArrayBuffer instead of readAsBinaryString
}

// Attach functions to the window object
window.connectMetaMask = connectMetaMask;
window.submitDocument = submitDocument;
window.sendHashToContract = sendHashToContract;
window.verifyDocumentFromContract = verifyDocumentFromContract;
