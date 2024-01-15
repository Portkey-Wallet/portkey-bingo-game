import BoardNumbers from '@/components/BoardNumbers';
import { Button, ButtonType } from '@/components/Button';

import styles from './mobile.module.scss';
import { BingoProps } from './index';
import { Fee } from '../Fee';

const Bingo: React.FC<BingoProps> = ({
  isWin,
  hasFinishBet,
  dice1,
  dice2,
  dice3,
  difference,
  onBingo,
  onBet,
  totalReturn,
}) => {
  const text = isWin ? 'You Win' : 'You Lose';
  const style = isWin
    ? {
        color: '#2E6BC7',
        background: '#C5DFFF',
      }
    : {
        color: '#D63333',
        background: '#FFCB9B',
      };

  return (
    <div className={styles.container}>
      <div className={styles.centerPopup}>
        <div className={styles.playWrapper}>
          <div className={styles.playContent}>
            <div className={styles.bingoContent}>
              <BoardNumbers
                isFinished={hasFinishBet}
                number1={hasFinishBet ? dice1 : 0}
                number2={hasFinishBet ? dice2 : 0}
                number3={hasFinishBet ? dice3 : 0}
              />
              {hasFinishBet ? (
                <>
                  <div className={styles.bingoTips}>
                    {isWin ? (
                      <img src={require('@source/congratulations.svg').default.src} />
                    ) : (
                      <img src={require('@source/lose_mobile.svg').default.src} className={styles.loseBingo} />
                    )}
                    <div className={styles.bingoText}>
                      <span>{text}</span>
                      <span style={style}>{Math.abs(difference).toFixed(2)} ELF</span>
                    </div>
                    {isWin && totalReturn && (
                      <div className={styles.bingoText}>
                        <span>Total Return</span>
                        <span style={style}>{totalReturn.toFixed(2)} ELF</span>
                      </div>
                    )}
                  </div>
                  <Button
                    isMobile
                    className={styles.playContent__betBtn}
                    type={ButtonType.ORANGE}
                    onClick={() => {
                      onBet();
                    }}>
                    <span>
                      <img src={require('@source/button_bet.png').default.src} className={styles.buttonBetImg} />
                    </span>
                  </Button>
                  <Fee />
                </>
              ) : (
                <Button isMobile className={styles.playContent__betBtn} type={ButtonType.ORANGE} onClick={onBingo}>
                  <span>
                    <img src={require('@source/button_bingo.png').default.src} className={styles.buttonBingoImg} />
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bingo;
