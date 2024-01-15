import { ChainId } from '@portkey/types';

const bingoAddress = process.env.NEXT_PUBLIC_BINGO_ADDRESS;
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID as ChainId;
const MAIN_CHAIN_ID = 'AELF';
const connectUrl = process.env.NEXT_PUBLIC_CONNECT_URL;

export const isTestNet =
  typeof location !== 'undefined' &&
  !['bingogame-pro.portkey.finance', 'bingogame.portkey.finance'].includes(location?.host);
const currentNetworkType = `SideChain ${CHAIN_ID} ${isTestNet ? 'Testnet' : ''}`;
const anotherNetworkType = `MainChain AELF ${isTestNet ? 'Testnet' : ''}`;

const AELF_EXPLORER_BASEURL = isTestNet ? 'explorer-test-side02.aelf.io' : 'tdvv-explorer.aelf.io';

export {
  bingoAddress,
  CHAIN_ID,
  MAIN_CHAIN_ID,
  currentNetworkType,
  anotherNetworkType,
  AELF_EXPLORER_BASEURL,
  connectUrl,
};
