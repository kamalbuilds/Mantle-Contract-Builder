interface BrianAIResponse {
  result: string;
  abi: any[];
  bytecode: string;
}

interface BrianAIError {
  error: string;
  status: number;
} 