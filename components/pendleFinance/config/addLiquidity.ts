import { callSDK, MANTLE_CHAIN_ID } from "@/config/pendleConfig";
import { AddLiquidityData } from "@/config/types";

export const addLiquidity = async ({
  marketAddress,
  receiverAddress,
  tokenIn,
  amountIn,
}: {
  marketAddress: string;
  receiverAddress: string;
  tokenIn: string;
  amountIn: string;
}) => {
  const res = await callSDK<AddLiquidityData>(
    `/v1/sdk/${MANTLE_CHAIN_ID}/markets/${marketAddress}/add-liquidity`,
    {
      receiver: receiverAddress,
      slippage: 0.01,
      tokenIn: tokenIn,
      amountIn: amountIn,
    }
  );

  console.log("Response", res);

  console.log("Amount LP Out: ", res.data.amountLpOut);
  console.log("Price impact: ", res.data.priceImpact);

  return res.tx;
};
