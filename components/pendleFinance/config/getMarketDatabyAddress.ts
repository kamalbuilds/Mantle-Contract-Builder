import { callSDK, MANTLE_CHAIN_ID } from "@/config/pendleConfig";
import { AddLiquidityData } from "@/config/types";

export const getMarketDatabyAddress = async ({
  marketAddress,
}: {
  marketAddress: string;
}) => {
  const res = await callSDK<AddLiquidityData>(
    `/v2/${MANTLE_CHAIN_ID}/markets/${marketAddress}/data`
  );

  console.log("Response", res);

  return res;
};
