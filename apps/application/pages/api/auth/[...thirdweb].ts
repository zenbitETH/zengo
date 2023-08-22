import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.THIRDWEB_AUTH_DOMAIN || "",
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
  // NOTE: All these callbacks are optional! You can delete this section and
  // the Auth flow will still work.
  callbacks: {
    onLogin: async (address) => {
      // Here we can run side-effects like creating and updating user data
      // whenever a user logs in.
      //   if (!users[address]) {
      //     users[address] = {
      //       created_at: Date.now(),
      //       last_login_at: Date.now(),
      //       num_log_outs: 0,
      //     };
      //   } else {
      //     users[address].last_login_at = Date.now();
      //   }
      // We can also provide any session data to store in the user's session.
      //   return { role: ["admin"] };
    },
    onUser: async (user) => {
      // Here we can run side-effects whenever a user is fetched from the client side
      //   if (users[user.address]) {
      //     users[user.address].user_last_accessed = Date.now();
      //   }
      // And we can provide any extra user data to be sent to the client
      // along with the default user object.
      //   return users[user.address];
    },
    onLogout: async (user) => {
      // Finally, we can run any side-effects whenever a user logs out.
      //   if (users[user.address]) {
      //     users[user.address].num_log_outs++;
      //   }
      // TODO: redirect to "/" ?
    },
  },
});

export default ThirdwebAuthHandler();
