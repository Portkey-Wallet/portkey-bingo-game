import useSWRImmutable from 'swr/immutable';
import { did } from '@portkey/did-ui-react';

export const useChainsInfo = () => {
  return useSWRImmutable('chainsinfoindex', async () => {
    const chainsInfo = await did.services.getChainsInfo();

    return chainsInfo;
  });
};
