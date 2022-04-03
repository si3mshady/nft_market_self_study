require("@nomiclabs/hardhat-waffle")
const fs = require('fs')
const privateKey = fs.readFileSync(".secret").toString().trim() // || 

const projectId = "5b252a78f91b46ada0ef3f70189459ed"

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
 mumbai: {
   url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
   accounts: [privateKey]
 },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}