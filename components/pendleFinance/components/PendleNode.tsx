import React, { useState, useCallback, useEffect } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Droplets, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMarketDatabyAddress } from "../config/getMarketDatabyAddress";
import { getMarketTokens } from "../config/getMarketTokens";
import { getAssetsByAddress } from "../constants/MarketAssets";

const PendleNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  const MarketAssetTokens = getAssetsByAddress(data.market.address);
  const lastTokenValue =
    MarketAssetTokens.length > 0
      ? MarketAssetTokens[MarketAssetTokens.length - 1].name
      : "";
  const [toCurrency, setToCurrency] = useState(lastTokenValue);

  console.log("toCurrency", toCurrency);

  const [fromCurrency, setFromCurrency] = useState([]);
  const [amountIn, setAmountIn] = useState("");
  //   const [toCurrency, setToCurrency] = useState("");
  const [error, setError] = useState("");

  console.log("Data in PendleNode", data);

  useEffect(() => {
    console.log("data.market.address", data.market.address);

    if (data.market.address) {
      (async () => {
        const MarketTokens = await getMarketTokens({
          marketAddress: data.market.address,
        });
        console.log("MarketTokens", MarketTokens);

        const MarketData = await getMarketDatabyAddress({
          marketAddress: data.market.address,
        });
        console.log("MarketData", MarketData);
      })();
    }
  }, [data.market]);

  const onFromCurrencyChange = useCallback((value: string) => {
    setFromCurrency(value);
  }, []);

  const onToCurrencyChange = useCallback(() => {
    if (isNaN(Number(toCurrency))) {
      setError("Please enter a valid number");
    } else {
      setError("");
      // Here you can add logic to handle the valid input
      console.log("Valid amount:", Number(toCurrency));
    }
  }, [toCurrency]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmountIn(value);
      setError("");
    }
  };

  return (
    <div
      className={`${data.color} text-white p-4 rounded-lg shadow-md boder-[1px] ${data.borderColor} ${data.hoverBorderColor} transition-colors w-[250px]`}
    >
      <div className="flex items-center justify-between mb-4">
        <span>{data.content} Pool</span>
        <Droplets className="w-4 h-4" />
      </div>
      <div
        className="flex flex-col space-y-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center">
          <input
            type="text"
            value={amountIn}
            onChange={handleInputChange}
            placeholder="Enter amount"
            className={`w-full text-sm ${data.color} border-[1px] ${data.borderColor}   p-2 rounded-md`}
          />
          <Button
            onClick={onToCurrencyChange}
            className={`bg-[#2F5B87] text-white size-9 ml-2 rounded-md hover:bg-[#4C86C1] transition-colors`}
          >
            <Check />
          </Button>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <h3>Amount In</h3>
            <Select onValueChange={onFromCurrencyChange} value={fromCurrency}>
              <SelectTrigger
                className={`w-full ${data.color} border-[1px] ${data.borderColor}`}
              >
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                {MarketAssetTokens.map((token) => (
                  <SelectItem key={token.address} value={token.name}>
                    {token.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <h3>LP Token</h3>
            <Button variant="outline">{toCurrency}</Button>
          </div>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default PendleNode;
