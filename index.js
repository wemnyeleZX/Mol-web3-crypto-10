import { ethers } from 'ethers';
import PaymentProcessorContract from './contracts/PaymentProcessorContract.json';

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const signer = provider.getSigner();
const paymentProcessor = new ethers.Contract(PaymentProcessorContract.address, PaymentProcessorContract.abi, signer);

async function processCryptoPayment(amountInETH, recipientAddress) {
  const tx = await paymentProcessor.pay(recipientAddress, { value: ethers.utils.parseEther(amountInETH.toString()) });
  await tx.wait();
  return tx.hash;
}
