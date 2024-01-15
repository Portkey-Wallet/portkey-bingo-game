import { useAppContext } from './useAppContext';
import { useSelector } from '@xstate/react';

export const useHeaderService = () => {
  const { headerService } = useAppContext();

  return headerService;
};

const openedSelector = (state) => {
  return state.matches('opened');
};

export const useIsHeaderOpen = () => {
  const headerService = useHeaderService();

  const selected = useSelector(headerService, openedSelector);

  return selected as boolean;
};
