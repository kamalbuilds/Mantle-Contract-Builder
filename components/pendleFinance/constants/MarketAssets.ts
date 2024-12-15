export const MarketAsset = {
  "0x2ddd4808fbb2e08b563af99b8f340433c32c8cc2": [
    {
      name: "PT USDe",
      decimals: 18,
      address: "0x8be66a48ea1f4aff89cd2beb50b02d901dfb9584",
      symbol: "PT-USDe-26DEC2024",
      tags: ["PT"],
      expiry: "2024-12-26T00:00:00.000Z",
    },
    {
      name: "YT USDe",
      decimals: 18,
      address: "0x119de9edbaf4565d7cb6a1b7e5c7f9d1f03de5c0",
      symbol: "YT-USDe-26DEC2024",
      tags: ["YT"],
      expiry: "2024-12-26T00:00:00.000Z",
    },
    {
      name: "USDe (Dec 2024)",
      decimals: 18,
      address: "0x9660ac0cb085f8fb39a6f383cf2067785364f924",
      symbol: "SY-USDe",
      tags: ["SY"],
      expiry: "",
    },
    {
      name: "LP USDe",
      decimals: 18,
      address: "0x2ddd4808fbb2e08b563af99b8f340433c32c8cc2",
      symbol: "PENDLE-LPT",
      tags: ["PENDLE_LP"],
      expiry: "2024-12-26T00:00:00.000Z",
    },
  ],
  "0x99e83709846b6cb82d47a0d78b175e68497ea28b": [
    {
      name: "SY mETH",
      decimals: 18,
      address: "0x9ab557331ddada945eb2ece19b90bd7a843f8665",
      symbol: "SY-mETH",
      tags: ["SY"],
      expiry: "",
    },
    {
      name: "PT mETH",
      decimals: 18,
      address: "0x1333b49bbdd06544a25647f9127358d9a9486105",
      symbol: "PT-mETH-26DEC2024",
      tags: ["PT"],
      expiry: "2024-12-26T00:00:00.000Z",
    },
    {
      name: "YT mETH",
      decimals: 18,
      address: "0x007d35c67f97f2a898102a66df346f9e9422f7f0",
      symbol: "YT-mETH-26DEC2024",
      tags: ["YT"],
      expiry: "2024-12-26T00:00:00.000Z",
    },
    {
      name: "LP mETH",
      decimals: 18,
      address: "0x99e83709846b6cb82d47a0d78b175e68497ea28b",
      symbol: "PENDLE-LPT",
      tags: ["PENDLE_LP"],
      expiry: "2024-12-26T00:00:00.000Z",
    },
  ],
  "0x0b923f8039ae827e963fcc1b48ab5b903d01925b": [
    {
      name: "PT cmETH",
      decimals: 18,
      address: "0xebf4ff21459fecf96e36cf1dd00db01367254bcd",
      symbol: "PT-cmETH-13FEB2025",
      tags: ["PT"],
      expiry: "2025-02-13T00:00:00.000Z",
    },
    {
      name: "YT cmETH",
      decimals: 18,
      address: "0x22bdbbec06611cfca7bfe3a53e9e574771851176",
      symbol: "YT-cmETH-13FEB2025",
      tags: ["YT"],
      expiry: "2025-02-13T00:00:00.000Z",
    },
    {
      name: "cmETH",
      decimals: 18,
      address: "0x2ab88ac7458faec2e952bb79cc1be6577bf63e70",
      symbol: "SY-cmETH",
      tags: ["SY"],
      expiry: "",
    },
  ],
};

export const getAssetsByAddress = (address: string) => {
  return MarketAsset[address] || [];
};
