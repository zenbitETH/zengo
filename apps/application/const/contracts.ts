/**
 * Configure your smart contract addresses here.
 * Each smart contract should have two addresses defined:
 *   1. Development address - used for testing purposes
 *   2. Production address - the mainnet smart contract address for when you deploy your application
 */

import { IS_DEV_ENV } from "./chains";

// For example, below, we have a Greeter smart contract that has two addresses defined.
// Then, we use the IS_DEV_ENV variable to determine which address to use in the current environment.

const simpletFaucet_dev = "0x321BF7f2b41149F11D95CC370f8FDC4096d3F6Ca";
const simpletFaucet_prod = "";

const zengoDao_dev = "0x5Aa4A41D13b2442f69C6f75B1760C71f30912648";
const zengoDao_prod = "";

// Below, we force the typescript type to be of the dev address type.
// This is to ensure thirdweb generate knows what the ABI is when using useContract
// So that we get type-safety when interacting with it's functions.
export const contractAddress_simpleFaucet = IS_DEV_ENV
  ? simpletFaucet_dev
  : (simpletFaucet_prod as typeof simpletFaucet_dev); // Here's the type assertion, since we assume the ABIs are the same in dev and prod.

export const contractAddress_zengoDao = IS_DEV_ENV
  ? zengoDao_dev
  : (zengoDao_prod as typeof zengoDao_dev);
