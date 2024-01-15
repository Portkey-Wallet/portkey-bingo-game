'use client';

import { CHAIN_ID, connectUrl, isTestNet } from './constants/network';
import { AppContextProvider } from './hooks/useAppContext/Provider';
import { WebLoginProvider, setGlobalConfig, PortkeyProvider } from 'aelf-web-login';

import { getGraphQLClientProvider } from '@portkey/graphql';
import { ApolloProvider } from '@apollo/client';
import { detectBrowser } from './utils/common';
import { SHOW_LOGIN_WITH_PORTKEY } from './constants/global';
import { NetworkType } from '@portkey/did-ui-react/dist/_types/';

const APPNAME = 'bingogame.portkey.finance';
export const NETWORK: NetworkType = isTestNet ? 'TESTNET' : 'MAIN';

const iconAddress = `${window.location}favicon.ico`;
const portkeyScanUrl = '/AElfIndexer_DApp/PortKeyIndexerCASchema/graphql';
const bingoGraphql = '/BingoGame_DApp/BingoGameIndexerCASchema/graphql';

setGlobalConfig({
  appName: APPNAME,
  chainId: CHAIN_ID,
  networkType: NETWORK as any,
  portkey: {
    useLocalStorage: true,
    graphQLUrl: portkeyScanUrl,
    connectUrl: connectUrl,
    requestDefaults: {
      headers: {
        version: 'v1.3.2',
      },
    },
    ...(SHOW_LOGIN_WITH_PORTKEY && {
      socialLogin: {
        Portkey:
          process.env.NEXT_PUBLIC_APP_ENV === 'main'
            ? undefined
            : {
                websiteName: 'Bingo Game',
                websiteIcon: iconAddress,
              },
      },
    }),
    network: {
      defaultNetwork: NETWORK,
      networkList: [
        {
          name: 'aelf MAIN',
          walletType: 'aelf',
          networkType: NETWORK,
          isActive: true,
          apiUrl: '',
          graphQLUrl: portkeyScanUrl,
          connectUrl: connectUrl,
        },
      ],
    },
  } as any,
  aelfReact: {
    appName: APPNAME,
    nodes: {},
  },
  defaultRpcUrl: '',
});

export default function Providers({ children }) {
  return (
    <PortkeyProvider networkType={NETWORK}>
      <WebLoginProvider
        nightElf={{
          connectEagerly: false,
        }}
        portkey={{
          autoShowUnlock: true,
          checkAccountInfoSync: true,
        }}
        discover={{
          autoRequestAccount: true,
          autoLogoutOnDisconnected: true,
          autoLogoutOnNetworkMismatch: false,
          autoLogoutOnAccountMismatch: false,
          autoLogoutOnChainMismatch: false,
          onPluginNotFound: (openStore) => {
            const browser = detectBrowser();

            if (browser === 'chrome') {
              openStore();
            } else {
              window.open('https://portkey.finance', '_blank');
            }
          },
        }}
        extraWallets={['discover']}>
        <ApolloProvider client={getGraphQLClientProvider(bingoGraphql)}>
          <AppContextProvider>{children}</AppContextProvider>
        </ApolloProvider>
      </WebLoginProvider>
    </PortkeyProvider>
  );
}
