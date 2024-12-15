import { NextResponse } from 'next/server';

const BRIAN_API_URL = 'https://api.brianknows.org/api/v0/agent/smart-contract';
const BRIAN_API_KEY = process.env.BRIAN_API_KEY;

export async function POST(request: Request) {
  try {
    console.log("inside brian-contract");
    const { prompt } = await request.json();

console.log("prompt is", prompt);
    const response = await fetch(BRIAN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Brian-Api-Key': BRIAN_API_KEY!
      },
      body: JSON.stringify({
        prompt,
        compile: true
      })
    });

    console.log("response is", response);

    if (!response.ok) {
      throw new Error(`Brian AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the Solidity code from markdown code block
    const codeMatch = data.result.match(/```solidity\n([\s\S]*?)```/);
    const sourceCode = codeMatch ? codeMatch[1].trim() : '';

    return NextResponse.json({
      success: true,
      sourceCode,
      abi: data.abi,
      bytecode: data.bytecode
    });

  } catch (error) {
    console.error('Brian AI error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
} 