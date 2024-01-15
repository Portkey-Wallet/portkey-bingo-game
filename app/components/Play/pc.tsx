import React from 'react';

import { Button, ButtonType } from '@/components/Button';
import { MAX_BET_VALUE } from '@/constants/global';

import styles from './pc.module.scss';
import BoardNumbers from '@/components/BoardNumbers';
import AmountInput from '@/components/AmountInput';
import ButtonMinMax, { minmaxError } from '@/components/ButtonMinMax';
import PlayLayout from '@/components/PlayLayout/PlayLayout';
import CountDown from '@/components/CountDown';
import { BetType } from '@/type';
import { usePlay } from '@/hooks/usePlay';
import { usePlayState } from './usePlayState';
import { useAppContext } from '@/hooks/useAppContext';
import { EGameState } from '@/hooks/useAppContext/type';

const Play: React.FC = () => {
  const { inputValue, setInputValue, setMin, setMax } = usePlayState();
  const { trigger } = usePlay(inputValue);
  const { gameState } = useAppContext();

  const onPlay = (betType: BetType) => async () => {
    await trigger(betType);
  };

  return (
    <div className={styles.contentWrapper}>
      <div
        className={[styles.content__bg, gameState === EGameState.Countdown ? styles.content__bg_cutdown : ''].join(
          ' ',
        )}>
        <div className={styles.content__wrapper}>
          {gameState === EGameState.Countdown && <CountDown />}

          {gameState === EGameState.Playing && (
            <PlayLayout
              left={<BoardNumbers number1={0} number2={0} number3={0} />}
              input={<AmountInput value={inputValue} onChange={setInputValue} />}
              minmax={
                <>
                  <ButtonMinMax onClick={setMin}>MIN</ButtonMinMax>
                  <ButtonMinMax onClick={setMax}>
                    MAX
                    <span>{`(${MAX_BET_VALUE})`}</span>
                  </ButtonMinMax>
                </>
              }
              minmaxError={minmaxError(inputValue)}
              bigsmall={
                <>
                  <Button isMobile={false} type={ButtonType.ORANGE} onClick={onPlay(BetType.BIG)}>
                    BIG
                  </Button>
                  <Button isMobile={false} type={ButtonType.BLUE} onClick={onPlay(BetType.SMALL)}>
                    SMALL
                  </Button>
                </>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Play;
