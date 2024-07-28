const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3002;
const dotenv = require("dotenv");
dotenv.config();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://boden-tremp-2024.vercel.app",
      "https://www.bodentremp2024.com",
    ],
  })
);

const config = {
  aMint: "CTg3ZgYx79zrE1MteDVkmkcGniiFrK1hJ6yiabropump",
  aDescriptor: "NEIRO",
  bMint: "CTJf74cTo3cw8acFP1YXF3QpsQUUBGBjh2k2e8xsZ6UL",
  bDescriptor: "Neiro",
};
/**
 * @typedef {Object} TokenAccount
 * @property {string} address
 * @property {string} mint
 * @property {string} owner
 * @property {number} amount
 * @property {number} delegated_amount
 * @property {boolean} frozen
 */
const rpcUrl = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";
const holders = {
  [config.aDescriptor]: 0,
  [config.bDescriptor]: 0,
};
/**
 *
 * @param {'NEIRO' | 'Neiro'} key
 * @returns {Map<string, TokenAccount>}
 */
const findHolders = async (address) => {
  let page = 1;
  let allOwners = new Map();
  console.log(address);
  try {
    while (true) {
      console.log('page ', page);
      const response = await fetch(rpcUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "getTokenAccounts",
          id: "bar",
          params: {
            page: page,
            limit: 1000,
            displayOptions: {},
            mint: address,
          },
        }),
      }).catch((e) => {
        console.log(e);
      });
      if (response.status !== 200) {
        console.log(`Error fetching data. Status: ${response.status}`);
        break;
      }
      const data = await response.json();

      if (!data.result || data.result.token_accounts.length === 0) {
        console.log(`No more results. Total pages: ${page - 1}`);

        break;
      }
      data.result.token_accounts.forEach((account) => {
        if (account.amount > 0) {
          allOwners.set(account.owner, account);
        }
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      page++;
    }
    console.log(`Total holders: ${allOwners.size}`);
    return allOwners.size;
  } catch (error) {
    console.error(error);
    // return holders[address];
  }
};

app.get("/get-holders", (req, res) => {
  return res.send({ holders: holders });
});
const fetchAccounts = async () => {
  await findHolders(config.aMint).then((data) => {
    holders[config.aDescriptor] = data;
  });
  await findHolders(config.bMint).then((data) => {
    holders[config.bDescriptor] = data;
  });
};
setInterval(() => {
  fetchAccounts();
}, 1000 * 60 * 10);

app.listen(port, () => {
  fetchAccounts();
  console.log(`Example app listening on port ${port}`);
});
