import useSWRMutation from 'swr/mutation';
import { bingoAddress } from '@/constants/network';
import { useApprove } from './useApprove';
import { useContract } from './useContract';
import { SendMethods, ViewMethods } from '@/type';
import { useAppContext } from './useAppContext';
import { useWebLogin } from 'aelf-web-login';

export const useRegister = () => {
  const { trigger: approve } = useApprove();
  const { callSendMethod, callViewMethod } = useContract();
  const { isRegistered, setIsRegistered } = useAppContext();
  const { wallet } = useWebLogin();

  return useSWRMutation('register', async () => {
    if (isRegistered) return true;

    const playerInfo = await callViewMethod({
      methodName: ViewMethods.GetPlayerInformation,
      contractAddress: bingoAddress,
      args: wallet.address,
    });

    if (playerInfo) return true;

    const registerResult = await callSendMethod<any, { error: { message: string } }>(
      {
        methodName: SendMethods.Register,
        contractAddress: bingoAddress,
        args: {},
      },
      undefined,
    );

    if (!registerResult.error || registerResult.error.message?.includes('already registered')) {
      await approve();
      setIsRegistered(true);

      return true;
    } else {
      throw registerResult.error;
    }
  });
};
