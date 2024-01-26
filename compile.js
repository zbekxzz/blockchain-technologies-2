const fs = require("fs").promises;
const solc = require("solc");

async function main() {
  const sourceCode = await fs.readFile("Demo.sol", "utf8");
  const { abi, bytecode } = compile(sourceCode, "Demo");
  const artifact = JSON.stringify({ abi, bytecode }, null, 2);
  await fs.writeFile("Demo.json", artifact);
}

function compile(sourceCode, contractName) {
  const input = {
    language: "Solidity",
    sources: { main: { content: sourceCode } },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } },
  };
  const output = solc.compile(JSON.stringify(input));
  const artifact = JSON.parse(output).contracts.main[contractName];
  return {
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object,
  };
}

main()