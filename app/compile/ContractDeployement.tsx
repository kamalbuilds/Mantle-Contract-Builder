import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import '@rainbow-me/rainbowkit/styles.css'
import { createConnector } from '@wagmi/core'

const ContractDeployment: React.FC<{ hash: `0x${string}` }> = ({ hash }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [contractCode, setContractCode] = useState<string>('');
  const contractAddress = "Click deploy to get your contract address";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setIsCopied(true);
      let count = 0;
      const interval = setInterval(() => {
        if (count >= 50) {
          clearInterval(interval);
          setIsCopied(false);
        }
        count++;
      }, 40); // 50 times in 2 seconds = 40ms interval
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    const fetchContractCode = async () => {
      try {
        const response = await fetch('/get-contract');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { contractCode } = await response.json();
        setContractCode(contractCode);
      } catch (error) {
        console.error('Error fetching contract code:', error);
      }
    };

    const intervalId = setInterval(fetchContractCode, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-[#141313] border-l border-[#2A2A2A] p-8 py-12 h-screen overflow-y-auto">
      <div className="space-y-8">
        {/* Contract Address Section */}
        <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#2A2A2A]">
          <h2 className="text-xl font-medium mb-4">Contract Deployment</h2>
          <div className="flex flex-row space-x-3 items-center">
            <Input
              value={contractAddress}
              readOnly
              className="bg-[#141313] border-[#2A2A2A] text-white rounded-md font-mono text-sm"
            />
            <Button
              onClick={copyToClipboard}
              className="flex bg-[#1F1F1F] border border-[#2A2A2A] hover:bg-[#252525] transition-colors"
              size="icon"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          {isCopied && (
            <p className="text-sm text-green-500 mt-2">Copied to clipboard!</p>
          )}
        </div>

        {/* Contract Code Section */}
        <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#2A2A2A]">
          <h2 className="text-xl font-medium mb-4">Contract Code</h2>
          <div className="text-[#B2B2B2] text-sm font-mono bg-[#141313] border border-[#2A2A2A] p-6 rounded-md overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              {contractCode || '// Loading contract code...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDeployment;
