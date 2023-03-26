// Node code lives here!
const Web3 = require('web3')
const express = require('express')
const BloodOathABI = require('./BloodOathAbi.json')
const bodyParser = require('body-parser');
const cors = require('cors');
const {create} = require('ipfs-http-client');
const app = express()
const port = 3000
const fs = require("fs");


app.use(express.static('UI'))
let web3 = new Web3('https://goerli.infura.io/v3/e2b666d2467a495b953e303169bc2c5e');
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Functions
// let contractAddressUniversal = '0x590cE3c3FB977e301F05CA1Be3edA943cf261BdB';  //OLD
let contractAddressUniversal = '0xD73D45D2f3b36cE9DF7aDE0711481B63A95dEc03';  //NEW


function getbalance(accAddress) {
}

function contractFunction_setValue(senderAddr, fileHash, transactionType){
  
  let contract = new web3.eth.Contract(BloodOathABI, contractAddressUniversal)
  // Trying to send the transaction!
  contract.methods.setValue(fileHash, transactionType).send({
    from : senderAddr
  }).then(console.log)
}

// Login to infura.io and go to IPFS to create a project, after creating the project you will get the INFURA_SECRET_KEY and INFURA_ID set them here.
const INFURA_ID = "2NX1JjA1RWs5Cbh2tUcZYFvAXc6";// made empty for security purpose
const INFURA_SECRET_KEY = "294c5fd49aee1f345b078039d45a7927";// made empty for security purpose
const auth =
  "Basic " +
  Buffer.from(INFURA_ID + ":" + INFURA_SECRET_KEY).toString("base64");
async function ipfsClient() {
  const ipfs = await create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth, // infura auth credentails
    },
  });
  return ipfs;
}
async function savetoIPFS(mystr){
  let ipfs = await ipfsClient()
  let result = await ipfs.add(mystr)
  console.log(result)
  return result;

}








// Routes


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req, res) => {
    res.sendFile(`${__dirname}/UI/login/login-index.html`);
})

app.post('/storeJsonAndGenerateHash', async (req, res) => {
  // Reading isbn from the URL
  const fullJson = req.body.fullJSON;
  // Now put it on filecoin and get hash!
  let hash = await  savetoIPFS(JSON.stringify(fullJson))
  // Sending 404 when not found something is a good practice
  res.status(200).json({msg:"Ok", hash:hash})
});


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
