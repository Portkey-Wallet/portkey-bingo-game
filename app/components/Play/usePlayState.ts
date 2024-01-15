import { INITIAL_INPUT_VALUE, MAX_BET_VALUE } from '@/constants/global';
import { useEffect, useState } from 'react';

export const usePlayState = () => {
  const [inputValue, setInputValue] = useState<string>(INITIAL_INPUT_VALUE);
  useEffect(() => {
    setMin();
  }, []);
  const setMin = () => {
    setInputValue(INITIAL_INPUT_VALUE);
  };
  const setMax = () => {
    setInputValue(`${MAX_BET_VALUE}`);
  };

  return {
    inputValue,
    setInputValue,
    setMin,
    setMax,
  };
};
