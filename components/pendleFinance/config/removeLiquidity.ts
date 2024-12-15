import { callSDK, MANTLE_CHAIN_ID } from "@/config/pendleConfig";
import { RemoveLiquidityData } from "@/config/types";

export const removeLiquidity = async ({
  marketAddress,
  receiverAddress,
  tokenOut,
  amountIn,
}: {
  marketAddress: string;
  receiverAddress: string;
  tokenOut: string;
  amountIn: string;
}) => {
  // Remove 1 LP from wstETH pool to PT with 1% slippage
  const res = await callSDK<RemoveLiquidityData>(
    `/v1/sdk/${MANTLE_CHAIN_ID}/markets/${marketAddress}/remove-liquidity`,
    {
      receiver: receiverAddress,
      slippage: 0.01,
      tokenOut: tokenOut,
      // amountIn: '1000000000000000000'
      amountIn: amountIn,
    }
  );

  console.log("Response", res);

  console.log("Amount PT Out: ", res.data.amountOut);
  console.log("Price impact: ", res.data.priceImpact);

  return res.tx;
};
