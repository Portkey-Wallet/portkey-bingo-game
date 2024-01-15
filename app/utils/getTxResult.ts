import { Chain } from '@/type';
import AElf from 'aelf-sdk';
import { sleep } from './common';

export function getAElf(rpcUrl?: string) {
  const rpc = rpcUrl || '';
  const httpProviders: any = {};

  if (!httpProviders[rpc]) {
    httpProviders[rpc] = new AElf(new AElf.providers.HttpProvider(rpc));
  }
  return httpProviders[rpc];
}

export async function getTxResult({
  TransactionId,
  chainId,
  rpcUrl,
  reGetCount = 0,
  reNotexistedCount = 3,
}: {
  TransactionId: string;
  chainId: Chain;
  rpcUrl?: string;
  reGetCount?: number;
  reNotexistedCount?: number;
}): Promise<any> {
  const txResult = await getAElf(rpcUrl).chain.getTxResult(TransactionId);
  if (txResult.error && txResult.errorMessage) {
    throw Error(txResult.errorMessage.message || txResult.errorMessage.Message);
  }

  if (!txResult) {
    throw Error('Please check your internet connection and try again.');
  }

  if (txResult.Status.toLowerCase() === 'pending') {
    reGetCount++;
    await sleep(500);
    return getTxResult({ TransactionId, chainId, reGetCount, rpcUrl, reNotexistedCount });
  }

  if (txResult.Status.toLowerCase() === 'notexisted' && reNotexistedCount) {
    await sleep(500);
    reNotexistedCount--;
    return getTxResult({ TransactionId, chainId, reGetCount, rpcUrl, reNotexistedCount });
  }

  if (txResult.Status.toLowerCase() === 'mined') {
    return { TransactionId, txResult };
  }
  throw Error('Please check your internet connection and try again.');
}
