import useSWR from 'swr';
import AElf from 'aelf-sdk';
import { useChainInfo } from './useChainInfo';
import { CHAIN_ID } from '@/constants/network';
const { sha256 } = AElf.utils;

const newWallet = AElf.wallet.createNewWallet();

async function getTokenContractAddress(aelf: any): Promise<string> {
  const chainStatus = await aelf.chain.getChainStatus();
  const zeroC = await aelf.chain.contractAt(chainStatus.GenesisContractAddress, newWallet);
  return await zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.Token'));
}

export const useTokenContractAddress = () => {
  const chainInfo = useChainInfo(CHAIN_ID);

  return useSWR(chainInfo ? [chainInfo, 'tokenContractAddress'] : null, async ([chainInfo]) => {
    const aelf = new AElf(new AElf.providers.HttpProvider(chainInfo.endPoint));

    return await getTokenContractAddress(aelf);
  });
};
