import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BET_RESULT_ENUMS, NO_RETURN } from '../constants';
import { TOKEN_UNIT } from '@/constants/global';
import { ArrowIcon, BetWinIcon, BetLoseIcon } from '@/components/Icon';
import TransactionDetailCard from './TransactionDetailCard';
import { useTranslation } from 'react-i18next';
import { Collapse, Spin } from 'antd';
import clsx from 'clsx';
import { TransactionCardProps, BetsHistoryProps, BetListType } from '../types';
import { groupBetsByDate } from '../helper';
import { useBingoGameInfoQuery } from '@/services/graphql/hooks/bingoGameInfo';

import styles from './BetsHistory.module.scss';

const TransactionPCCard = ({ transaction, openedKey }: TransactionCardProps) => {
  const { t } = useTranslation();
  const isWin = transaction.isWin;
  return (
    <div className={clsx(styles.betTransaction, isWin ? styles.winBg : styles.loseBg)}>
      <div className={styles.betResult}>
        <div className={styles.betResultIcon}>{isWin ? <BetWinIcon /> : <BetLoseIcon />}</div>
        <span className={isWin ? styles.winColor : styles.loseColor}>
          {isWin ? BET_RESULT_ENUMS.win : BET_RESULT_ENUMS.lose}
        </span>
      </div>
      <div className={isWin ? styles.winBetType : styles.loseBetType}>{transaction.bingoType}</div>
      <div className={clsx(styles.betReturn, styles.text)}>{t('setting.bet.history.total.return')}</div>
      <div className={clsx(styles.text, isWin ? styles.winColor : '')}>
        {parseInt(transaction.totalReturn) === 0 ? NO_RETURN : `${transaction.totalReturn} ${TOKEN_UNIT}`}
      </div>
      <div className={clsx(styles.betReturn, styles.text)}>{t('setting.bet.history.bet.amount')}</div>
      <div className={styles.text}>{`${transaction.betAmount} ${TOKEN_UNIT}`}</div>
      <div className={clsx(styles.betReturn, styles.text)}>{t('setting.bet.history.transaction.fee')}</div>
      <div className={styles.text}>{transaction.totalTransactionFee}</div>
      <div className={clsx(styles.arrow, transaction.id === openedKey ? styles.opened : '')}>
        <ArrowIcon />
      </div>
    </div>
  );
};

const TransactionMobileCard = ({ transaction, openedKey }: TransactionCardProps) => {
  const { t } = useTranslation();
  const isWin = transaction.isWin;

  return (
    <div className={styles.cardWrapper}>
      <div
        className={clsx(styles.cardTitle, isWin ? [styles.winColor, styles.winBg] : [styles.loseColor, styles.loseBg])}>
        <div> {isWin ? BET_RESULT_ENUMS.win : BET_RESULT_ENUMS.lose}</div>
        <div className={styles.cardRight}>
          <div className={styles.betResultIcon}>{isWin ? <BetWinIcon /> : <BetLoseIcon />}</div>
          <div className={styles.cardRightText}>{transaction.bingoType}</div>
          <div className={clsx(styles.arrow, transaction.id === openedKey ? styles.opened : '')}>
            <ArrowIcon />
          </div>
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardRow}>
          <div>{t('setting.bet.history.total.return')}</div>
          <div> {parseInt(transaction.totalReturn) === 0 ? NO_RETURN : `${transaction.totalReturn} ${TOKEN_UNIT}`}</div>
        </div>
        <div className={styles.cardRow}>
          <div>{t('setting.bet.history.bet.amount')}</div>
          <div>{`${transaction.betAmount} ${TOKEN_UNIT}`}</div>
        </div>
        <div className={styles.cardRow}>
          <div>{t('setting.bet.history.transaction.fee')}</div>
          <div>{transaction.totalTransactionFee}</div>
        </div>
      </div>
    </div>
  );
};

const { Panel } = Collapse;
const BetsHistory = ({ isMobile, caAddress, setWinRatio }: BetsHistoryProps) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [betList, setBetList] = useState<BetListType>({});
  const [dataLength, setDataLength] = useState(0);
  const [openedKey, setOpenedKey] = useState('');
  const { data, loading, refetch } = useBingoGameInfoQuery({
    variables: {
      dto: { skipCount: 0, maxResultCount: 10, caAddresses: [caAddress] },
    },
    onCompleted: (data) => {
      setPage(page + 1);
      setDataLength(dataLength + data.bingoGameInfo.data.length);
      setBetList(groupBetsByDate(data.bingoGameInfo.data, betList));
      setWinRatio(`${data.bingoGameInfo.stats[0].totalWins}/${data.bingoGameInfo.stats[0].totalPlays}`);
    },
  });
  const totalRecordCount = data?.bingoGameInfo?.totalRecordCount || 0;

  const fetchMoreBets = () => {
    if (!loading) {
      refetch({
        dto: { skipCount: page * 10, maxResultCount: 10, caAddresses: [caAddress] },
      });
    }
  };

  const onBetToggle = (id: string[]) => {
    setOpenedKey(id[id.length - 1]);
  };

  return (
    <div className={isMobile ? styles.mobile : styles.pc}>
      {Object.keys(betList).length === 0 && (
        <div className={styles.loading}>
          <Spin spinning={loading} />
        </div>
      )}
      <InfiniteScroll
        className={styles.betListWrapper}
        dataLength={dataLength}
        next={fetchMoreBets}
        hasMore={!loading && totalRecordCount > dataLength}
        loader={<h4 className={styles.loading}>{t('loading')}</h4>}
        height={'33rem'}>
        {Object.keys(betList).map((date) => {
          const dateForDisplay = date.substring(0, date.length - 4);
          return (
            <div key={date}>
              <div className={styles.betDate}>{dateForDisplay}</div>
              {betList[date].map((bet, index) => {
                const isWin = bet.isWin;
                return (
                  <Collapse
                    ghost
                    expandIconPosition="end"
                    className={clsx(styles.collapse, isWin ? styles.win : styles.lose)}
                    onChange={onBetToggle}
                    activeKey={openedKey}
                    key={index}>
                    <Panel
                      header={
                        isMobile ? (
                          <TransactionMobileCard transaction={bet} openedKey={openedKey} />
                        ) : (
                          <TransactionPCCard transaction={bet} openedKey={openedKey} />
                        )
                      }
                      key={bet.id}>
                      <div className={isMobile ? '' : styles.pc}>
                        <TransactionDetailCard
                          transactionDetail={bet.play}
                          isMobileBrowser={isMobile}
                          title={t('setting.bet.history.play')}
                          caAddress={caAddress}
                        />
                        <TransactionDetailCard
                          transactionDetail={bet.bingo}
                          isMobileBrowser={isMobile}
                          title={t('setting.bet.history.bingo')}
                          caAddress={caAddress}
                        />
                      </div>
                    </Panel>
                  </Collapse>
                );
              })}
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
export default BetsHistory;
