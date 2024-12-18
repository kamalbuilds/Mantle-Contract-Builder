'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ContractFlow from '@/app/compile/ContractFlow';
import ContractDeployment from './ContractDeployement';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Blocks as BlocksIcon } from 'lucide-react';
import { deployContract } from '@wagmi/core'
import { config } from '../../lib/wagmi'
import { type DeployContractReturnType } from '@wagmi/core'


const nodeTypes = {
    // Define your custom node types here
};

const edgeTypes = {
    // Define your custom edge types here
};

// First, let's add an interface for the API response type
interface CompilationResult {
  abi: any[];
  bytecode: string;
}

// Add interface for flow summary item
interface FlowSummaryItem {
  content: string;
  id?: string;
}

const CompilePage: React.FC = () => {
    const searchParams = useSearchParams();
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [flowSummary, setFlowSummary] = useState<FlowSummaryItem[]>([]);
    // Update the type of apiResponse
    const [apiResponse, setApiResponse] = useState<CompilationResult | null>(null);
    const [bytecode, setBytecode] = useState<string | null>(null);
    const [abi, setAbi] = useState<any[] | null>(null);
    const [hash, setHash] = useState<`0x${string}` | null>(null);
    // Add deploymentArgs state
    const [deploymentArgs] = useState<any[]>([/* your initial args here */]);

    useEffect(() => {
        const nodesParam = searchParams.get('nodes');
        const edgesParam = searchParams.get('edges');
        const flowSummaryParam = searchParams.get('flowSummary');
        if (nodesParam && edgesParam && flowSummaryParam) {
            setNodes(JSON.parse(decodeURIComponent(nodesParam)));
            setEdges(JSON.parse(decodeURIComponent(edgesParam)));
            setFlowSummary(JSON.parse(decodeURIComponent(flowSummaryParam)));
        }
    }, [searchParams]);

    useEffect(() => {
    }, [hash]);

    const handleCompile = async () => {
        const flowSummaryJSON = {
            nodes: nodes,
            edges: edges,
            summary: flowSummary
        };

        try {
            // Convert flow summary to a natural language prompt
            const prompt = `Create a smart contract with the following structure:
              ${flowSummary.map(item => `- ${item.content}`).join('\n')}
            `;

            // Get contract from Brian AI
            const brianResponse = await fetch('/api/brian-contract', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const brianResult = await brianResponse.json();
            
            if (!brianResult.success) {
                console.error('Brian AI error:', brianResult.error);
                return;
            }

            // Set the compilation results directly from Brian AI
            setApiResponse({
                abi: brianResult.abi,
                bytecode: brianResult.bytecode
            });
            setBytecode(brianResult.bytecode);

        } catch (error) {
            console.error('Error in compilation process:', error);
        }
    };

    function LoadingComponent() {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }


    return (
                <Suspense fallback={<LoadingComponent />}>
        <div className="h-full">

            <div className="flex gap-6 h-full">
                {/* Left Section */}
                <section className="w-1/2 glass-panel p-6">
                    <div className="flex flex-col space-y-6">
                        <h2 className="text-xl font-medium">Contract Flow</h2>
                        <ContractFlow
                            nodes={nodes}
                            edges={edges}
                            flowSummary={flowSummary}
                        />
                        
                        <div className="flex space-x-4">
                            <Link href="/">
                                <Button variant="ghost" className="group text-white/70 hover:text-white hover:bg-white/5">
                                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                    Back
                                </Button>
                            </Link>
                            
                            <Button
                                onClick={handleCompile}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                            >
                                <BlocksIcon className="w-4 h-4 mr-2" />
                                Compile Contract
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Right Section */}
                <section className="w-1/2">
                    {hash ? (
                        <ContractDeployment hash={hash} />
                    ) : (
                        <ContractDeployment hash={`0x${"TX Hash will appear here"}`} />
                    )}
                </section>
            </div>

            {/* Deploy Button */}
            <div className="fixed bottom-8 right-8">
                <Button
                    variant="default"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 text-lg shadow-lg"
                    onClick={async () => {
                        if (!apiResponse?.abi || !apiResponse?.bytecode) {
                            console.error('Contract not compiled yet');
                            return;
                        }
                        
                        try {
                            const result = await deployContract(config, {
                                abi: apiResponse.abi,
                                bytecode: apiResponse.bytecode as `0x${string}`,
                                args: deploymentArgs,
                            });
                            setHash(result as `0x${string}`);
                        } catch (error) {
                            console.error('Deployment failed:', error);
                        }
                    }}
                >
                    <BlocksIcon className="w-5 h-5 mr-2" />
                    Deploy Contract
                </Button>
            </div>

            {/* Transaction Hash Notification */}
            {hash && (
                <div className="fixed bottom-24 right-8 bg-[#1A1A1A] p-4 rounded-lg border border-[#2A2A2A] shadow-xl max-w-md">
                    <h3 className="text-lg font-medium mb-2">Contract Deployed Successfully</h3>
                    <p className="text-sm text-gray-400 mb-2">Transaction Hash:</p>
                    <p className="text-xs font-mono break-all bg-[#141313] p-2 rounded border border-[#2A2A2A]">
                        {hash}
                    </p>
                </div>
            )}
        </div>
        </Suspense>
        
    );
};

export default CompilePage;
