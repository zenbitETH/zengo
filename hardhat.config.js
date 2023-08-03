require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "optimism",
  networks: {
    hardhat: {},
    optimism: {
      url: "https://opt-goerli.g.alchemy.com/v2/NP70atLwt7Cta2wpeA56u9bQT_pM__F2",
      accounts: ["173a99b99ad12ff2df7d3827b530cd0324fd60b90c76ace25880f088780733e5"],
      gasPrice: 35000000000,
    },
  },
  etherscan: {
    apiKey: "IIR35SMPEZWY426XXWN3TH7ITNCU18V3W4",
  },
};
