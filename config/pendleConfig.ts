import axios from "axios";

export const HOSTED_SDK_URL = "https://api-v2.pendle.finance/core/";

export const MANTLE_CHAIN_ID = 5000;

type MethodReturnType<Data> = {
  tx: {
    data: string;
    to: string;
    value: string;
  };
  data: Data;
};

export async function callSDK<Data>(
  path: string,
  params: Record<string, unknown> = {}
) {
  const response = await axios.get<MethodReturnType<Data>>(
    HOSTED_SDK_URL + path,
    {
      params,
    }
  );

  console.log("Response", response);

  return response.data;
}
