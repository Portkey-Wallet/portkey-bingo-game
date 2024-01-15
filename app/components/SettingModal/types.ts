type TransactionType = {
  date: string;
  amount: string;
  transactionFee: string;
  transactionId: string;
  transactionHash: string;
};

type BetHistoryType = {
  id: string;
  isWin: boolean;
  bingoType: number;
  totalReturn: string;
  betAmount: string;
  totalTransactionFee: string;
  play: TransactionType;
  bingo: TransactionType;
};

type BetListType = Record<string, BetHistoryType[]>;

interface SettingModalProps {
  showModal: boolean;
  setShowModal: (boolean) => void;
  type: string;
  isMobileBrowser: boolean;
  caAddress: string;
}

interface TransactionCardProps {
  transaction: BetHistoryType;
  openedKey: string;
}

interface TransactionDetailCardProps {
  transactionDetail: TransactionType;
  isMobileBrowser: boolean;
  title: string;
  caAddress: string;
}

interface ViewOnExploreProps {
  address: string;
  label: string;
}
interface BetsHistoryProps {
  isMobile: boolean;
  caAddress: string;
  setWinRatio: (ratio: string) => void;
}

export type {
  SettingModalProps,
  TransactionCardProps,
  BetHistoryType,
  BetsHistoryProps,
  TransactionDetailCardProps,
  ViewOnExploreProps,
  BetListType,
};
