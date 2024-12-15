declare module 'solc' {
  interface CompilerInput {
    language: string;
    sources: {
      [key: string]: {
        content: string;
      };
    };
    settings: {
      outputSelection: {
        [key: string]: {
          [key: string]: string[];
        };
      };
      optimizer?: {
        enabled: boolean;
        runs: number;
      };
    };
  }

  interface CompilerOutput {
    contracts: {
      [key: string]: {
        [key: string]: {
          abi: any[];
          evm: {
            bytecode: {
              object: string;
            };
            deployedBytecode: {
              object: string;
            };
          };
        };
      };
    };
    errors?: Array<{
      severity: 'error' | 'warning';
      message: string;
    }>;
  }

  interface Solc {
    compile(input: string): string;
  }

  const solc: Solc;
  export = solc;
} 