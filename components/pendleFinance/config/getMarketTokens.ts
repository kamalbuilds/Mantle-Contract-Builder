import { callSDK, MANTLE_CHAIN_ID } from "@/config/pendleConfig";
import { AddLiquidityData } from "@/config/types";

export const getMarketTokens = async ({
  marketAddress,
}: {
  marketAddress: string;
}) => {
  console.log("Market Address", marketAddress);

  const res = await callSDK<AddLiquidityData>(
    `/v1/sdk/${MANTLE_CHAIN_ID}/markets/${marketAddress}/tokens`
  );

  console.log("Response", res);

  return res;
};
