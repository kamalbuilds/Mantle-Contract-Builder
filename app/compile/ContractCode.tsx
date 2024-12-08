import React from 'react';

interface ContractCodeProps {
    code: string;
}

const ContractCode: React.FC<ContractCodeProps> = ({ code }) => {
    return (
        <div className="contract-code">
            <h2>Contract Code</h2>
            <pre>{code}</pre>
        </div>
    );
};

export default ContractCode;
