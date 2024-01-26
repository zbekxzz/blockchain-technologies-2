const { Web3 } = require("web3");
var ETHEREUM_NETWORK = "sepolia";
var INFURA_API_KEY = "59c7f850eb7b460188915e0990f913cc";
var SIGNER_PRIVATE_KEY = "87389bcd94c97926b8cd2a0dbbcf9d19c023aadba0f2375eb2be0dd77c3cc624";

const fs = require("fs");
const { abi, bytecode } = JSON.parse(fs.readFileSync("Demo.json"));

async function main() {
  const network = ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${INFURA_API_KEY}`,
    ),
  );
  const signer = web3.eth.accounts.privateKeyToAccount(
    '0x' + SIGNER_PRIVATE_KEY,
  );
  web3.eth.accounts.wallet.add(signer);

  const contract = new web3.eth.Contract(abi);
  contract.options.data = bytecode;
  const deployTx = contract.deploy();
  const deployedContract = await deployTx
    .send({
      from: signer.address,
      gas: await deployTx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining deployment transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  console.log(`Contract deployed at ${deployedContract.options.address}`);
  console.log(
    `Add DEMO_CONTRACT to the.env file to store the contract address: ${deployedContract.options.address}`,
  );
}

main();