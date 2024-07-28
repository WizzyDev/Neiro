type Config = {
  aDisplayNameShort: string;
  aDisplayNameLong: string;
  aDescriptor: string;
  aMint: string;
  aColor: string;
  aDecimals: number;
  aTicker: string;
  aCoingeckoId: string;

  bDisplayNameShort: string;
  bDisplayNameLong: string;
  bDescriptor: string;
  bMint: string;
  bColor: string;
  bDecimals: number;
  bTicker: string;
  bCoingeckoId: string;

  author: string;
  githubRepo: string;
  twitter: string;

  slippageBps: string;
};

export const config: Config = {
  aDisplayNameShort: "NEIRO",
  aDisplayNameLong: "NEIRO",
  aDescriptor: "19:55 UTC MINT",
  aMint: "CTg3ZgYx79zrE1MteDVkmkcGniiFrK1hJ6yiabropump",
  aColor: "rgb(1,73,171)",
  aDecimals: 6,
  aTicker: "NEIRO",
  aCoingeckoId: "NEIRO",

  bDisplayNameShort: "Neiro",
  bDisplayNameLong: "Neiro",
  bDescriptor: "21:05 UTC MINT",
  bMint: "CTJf74cTo3cw8acFP1YXF3QpsQUUBGBjh2k2e8xsZ6UL",
  bColor: "rgb(220,38,38)",
  bDecimals: 6,
  bTicker: "Neiro",
  bCoingeckoId: "Neiro",

  author: "Buck Fitches",

  slippageBps: "10000",
  githubRepo: "",
  twitter: ""
};
