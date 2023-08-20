import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    optimismGoerli: {
      url: "https://optimism-goerli.rpc.thirdweb.com",
      chainId: 420,
      gasPrice: 0,
    },
  },
};

export default config;
