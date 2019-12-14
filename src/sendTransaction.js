import { ethers } from "ethers";

const NETWORK = "goerli";

export default async function sendTransaction({
  valueInEth,
  gas,
  destinationAddress,
  sendMessage
}) {
  const accounts = await window.ethereum.enable();
  console.log("Accounts found:", accounts);
  //console.log(sendMessage);

  const provider = ethers.getDefaultProvider(NETWORK);
  const gasPrice = await provider.getGasPrice();
  let messageBytes = ethers.utils.toUtf8Bytes(sendMessage);

  const transactionParameters = {
    to: destinationAddress,
    from: accounts[0],
    gas: ethers.utils.hexlify(gas),
    gasPrice: gasPrice.toHexString(),
    value: ethers.utils.parseEther(valueInEth).toHexString(),
    data: ethers.utils.hexlify(messageBytes)
  };

  console.log("Sending transaction with params:", transactionParameters);
  const response = await window.ethereum.send("eth_sendTransaction", [
    transactionParameters
  ]);

  console.log(
    "Sent transaction: %o",
    `https://${NETWORK}.etherscan.io/tx/${response.result}`
  );
}
