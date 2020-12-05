require('babel-register');
require('babel-polyfill');

require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
let privateKeys = process.env.PRIVATE_KEYS || ""
// Array of account private keys


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','),
          `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      gas: 5000000,// how much gas do you need at ethgasstation.info
      gasPrice: 1000000000,//what does gas cost 
      confirmations: 1,
      network_id: "42"
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','),
          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      gas: 5000000,// how much gas do you need at ethgasstation.info
      gasPrice: 1000000000,//what does gas cost 
      confirmations: 1,
      network_id: "4"
    }

  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
