require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-etherscan');


const dotenv = require('dotenv');
dotenv.config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.5.8",
  networks : {
    goerli : {
      url : process.env.RPCURL,
      accounts : [process.env.private_key]
    },
  },
  etherscan : {
    apiKey : process.env.EtherScan_key
  }
};
