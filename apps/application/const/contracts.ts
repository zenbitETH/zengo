/**
 * Configure your smart contract addresses here.
 * Each smart contract should have two addresses defined:
 *   1. Development address - used for testing purposes
 *   2. Production address - the mainnet smart contract address for when you deploy your application
 */

import { IS_DEV_ENV } from "./chains";

// For example, below, we have a Greeter smart contract that has two addresses defined.
// Then, we use the IS_DEV_ENV variable to determine which address to use in the current environment.
// const greeter_dev = "0x2E74A1664dA1066FFa4aF8b85856cb474D189029";
// const greeter_prod = "";

const simpletFaucet_dev = "0x321BF7f2b41149F11D95CC370f8FDC4096d3F6Ca";
const simpletFaucet_prod = "";

const zengoDao_dev = "0xc1fcf7a7879A0b33a6EB84AeEBB10f30F5e533a2";
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
