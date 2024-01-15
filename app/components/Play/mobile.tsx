import React from 'react';

import { Button, ButtonType } from '@/components/Button';
import { MAX_BET_VALUE } from '@/constants/global';

import styles from './mobile.module.scss';
import BoardNumbers from '@/components/BoardNumbers';
import AmountInput from '@/components/AmountInput';
import ButtonMinMax, { minmaxError } from '@/components/ButtonMinMax';
import PlayLayout from '@/components/PlayLayout/PlayLayout';
import CountDown from '@/components/CountDown';
import { BetType } from '@/type';
import { usePlay } from '@/hooks/usePlay';
import { usePlayState } from './usePlayState';
import { EGameState } from '@/hooks/useAppContext/type';
import { useAppContext } from '@/hooks/useAppContext';

const Play: React.FC = () => {
  const { inputValue, setInputValue, setMin, setMax } = usePlayState();
  const { trigger } = usePlay(inputValue);
  const { gameState } = useAppContext();

  const onPlay = (betType: BetType) => async () => {
    await trigger(betType);
  };

  return (
    <div className={styles.container}>
      <div className={styles.centerPopup}>
        <div
          className={[styles.playWrapper, gameState === EGameState.Countdown ? styles.playWrapper_cutdown : ''].join(
            ' ',
          )}>
          {gameState === EGameState.Countdown && <CountDown />}
          <div className={styles.playContent}>
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
                    <Button isMobile type={ButtonType.ORANGE} onClick={onPlay(BetType.BIG)}>
                      <img src={require('@source/button_big.png').default.src} className={styles.buttonBigImg} />
                    </Button>
                    <Button isMobile type={ButtonType.BLUE} onClick={onPlay(BetType.SMALL)}>
                      <img src={require('@source/button_small.png').default.src} className={styles.buttonSmallImg} />
                    </Button>
                  </>
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
