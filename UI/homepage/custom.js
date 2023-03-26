//1- connect metamask
let account;
        
BloodOathABI = [
                    {
                        "constant": true,
                        "inputs": [],
                        "name": "name",
                        "outputs": [
                            {
                                "name": "",
                                "type": "string"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": false,
                        "inputs": [
                            {
                                "name": "_filehash",
                                "type": "string"
                            },
                            {
                                "name": "_transactiontype",
                                "type": "string"
                            },
                            {
                                "name": "_recvp",
                                "type": "string"
                            },
                            {
                                "name": "_sendp",
                                "type": "string"
                            }
                        ],
                        "name": "setValue",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "constant": true,
                        "inputs": [],
                        "name": "entry_count",
                        "outputs": [
                            {
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": true,
                        "inputs": [
                            {
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "name": "entries",
                        "outputs": [
                            {
                                "name": "entry_index",
                                "type": "uint256"
                            },
                            {
                                "name": "storage_hash",
                                "type": "string"
                            },
                            {
                                "name": "transaction_type",
                                "type": "string"
                            },
                            {
                                "name": "recv_party",
                                "type": "string"
                            },
                            {
                                "name": "send_party",
                                "type": "string"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "anonymous": false,
                        "inputs": [
                            {
                                "indexed": false,
                                "name": "entry_index",
                                "type": "uint256"
                            },
                            {
                                "indexed": false,
                                "name": "storage_hash",
                                "type": "string"
                            },
                            {
                                "indexed": false,
                                "name": "transaction_type",
                                "type": "string"
                            },
                            {
                                "indexed": false,
                                "name": "recv_party",
                                "type": "string"
                            },
                            {
                                "indexed": false,
                                "name": "send_party",
                                "type": "string"
                            }
                        ],
                        "name": "entryAdded",
                        "type": "event"
                    }
                ];
//2- connect to smart contract
const connectContract = async () => {
    const ABI = BloodOathABI;
    const Address = "0xD73D45D2f3b36cE9DF7aDE0711481B63A95dEc03";
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract( ABI, Address); 
    console.log("Contract Connected!")
}
const connectWallet = async () => {
    if(window.ethereum !== "undefined") {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        account = accounts[0];
        console.log(account)
        document.getElementsByClassName('wallet-conected')[0].classList.add('visible')
    }
    else{
        alert("No Dapp")
    }
    connectContract();
}
//3-read data from smart contract
const sendTransaction = async (_filehsh, _type, _sender, _recv) => {
    // console.log(data); 
    window.contract.methods.setValue(_filehsh,_type,_recv,_sender).send({from : account}).then(console.log)           
    document.getElementsByClassName('status-transaction')[0].innerHTML = `Data Uploaded to IPFS ... https://ipfs.io/ipfs/${file_hash} <hr> Now Adding to blockchain... DONE!`;
}

async function viewAllEntries(){
    // Get number of entries then run a for loop through it
    const data = await window.contract.methods.entry_count().call();
    console.log(`Total Entries : ${data}`)
    for (let i = 1; i <= data; i++) {
        const entry_info = await window.contract.methods.entries(i).call();
        console.log(`Entry Info for #${i}: ${entry_info.entry_index}`)
        // console.log(entry_info)
    }
}
function completetran(){

    // Get all info into a json 
    let sender_address = document.getElementById('donor_address').value
    let reciver_address = ethereum.selectedAddress
    let transaction_type = 'donation';

    let name_of_product = document.getElementById('name_of_product').value;
    let alphanum= document.getElementById('alpha_numeric_identification').value;
    let date_of_collection= document.getElementById('date_of_collection').value;
    let date_of_expiry= document.getElementById('date_of_expiry').value;
    let blood_abo= document.getElementById('blood_abo').value;
    let volm_blood_collected= document.getElementById('volm_blood_collected').value;
    let unexpected_antibodies= document.getElementById('unexpected_antibodies').value;
    let org_name= document.getElementById('org_name').value;
    let org_liscene= document.getElementById('org_liscene').value;
    
    let finalJson = {
        "sender_address" : sender_address,
        "reciver_address" : reciver_address,
        "transaction_type" : transaction_type,
        "name_of_product" : name_of_product,
        "alphanum" : alphanum,
        "date_of_collection" : date_of_collection,
        "date_of_expiry" : date_of_expiry,
        "blood_abo" : blood_abo,
        "volm_blood_collected" : volm_blood_collected,
        "unexpected_antibodies" : unexpected_antibodies,
        "org_name" : org_name,
        "org_liscene" : org_liscene,
    }
    // Send Json to server
    fetch("/storeJsonAndGenerateHash/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({fullJSON : finalJson})
    })
        .then(response => response.json())
        .then((response) => {
            file_hash = response.hash.path
            console.log(`File Uploaded on IPFS : https://ipfs.io/ipfs/${file_hash}`)
            document.getElementsByClassName('status-transaction')[0].innerHTML = `Data Uploaded to IPFS ... https://ipfs.io/ipfs/${file_hash} <hr> Now Adding to blockchain...`;

            sendTransaction(file_hash,'donation', ethereum.selectedAddress, document.getElementById('donor_address').value)

        })
        .catch(err => console.log(err))
    // SERVER---
        // Convert json obj to json file
        // Upload on filecoin
        // return hash to client
        // DONE

    // got file_hash from server

    // put hash in the contract
    // submit the contract in blockchain

}
document.getElementById('btn-trg-connectwallet').addEventListener('click', connectWallet);
document.getElementById('btn-trg-openform').addEventListener('click', showform);
document.getElementById('something').addEventListener('click', completetran());
// document.getElementById('complete_transaction').addEventListener('click', completetran);

// complete_transaction