import * as Sentry from '@sentry/nextjs';
import BigNumber from 'bignumber.js';

export type QRCodeDataObjType = {
  address: string;
  netWorkType: string;
  chainType: string;
  type: 'login' | 'send';
  toInfo: { name: string; address: string };
  deviceType?: number;
  assetInfo: {
    symbol: string;
    tokenContractAddress: string;
    chainId: string;
    decimals: string | number;
  };
};

export type QrCodeDataArrType = [
  string, // chainType
  string, // netWorkType
  'login' | 'send', // type
  string, // toAddress
  string, // symbol
  string, // tokenContractAddress
  string, // chainId
  string | number, // decimals
  number | undefined, //
];

export interface IOptions {
  timer: number | null;
  callback: () => void;
  timeout: number;
}

export const copy = (content: string) => {
  const input = document.createElement('input');
  input.value = content;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  input.remove();
};

// check if the user is on mobile
export const isMobile = (uaString?: string) => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(uaString);
};

export const shrinkSendQrData = (data: QRCodeDataObjType): QrCodeDataArrType => {
  // 1.chainType  2.netWorkType 3.data.type 4.toAddress 5. symbol 6. tokenContractAddress 7. chainId 8. decimals
  return [
    data.chainType,
    data.netWorkType,
    data.type,
    data.address,
    data.assetInfo.symbol,
    data.assetInfo.tokenContractAddress,
    data.assetInfo.chainId,
    data.assetInfo.decimals,
    data.deviceType,
  ];
};

export const decodeAmount = (amount: BigNumber, decimalPlaces: number) => {
  return amount.dividedBy(new BigNumber(100000000)).dp(decimalPlaces, BigNumber.ROUND_DOWN);
};

export const convertTicks = (ticks: number) => {
  return (ticks - 621355968000000000) / 10000;
};

export const decorateBalanceText = (balance: string) => {
  if (!(balance?.length > 0)) return balance;
  let dealedBalance = balance;
  if (balance.lastIndexOf('.') > 0) {
    const [before, after] = balance.split('.').map((val, idx) => (idx !== 0 ? val.substring(0, 2) : val));
    const checkedAfter =
      after?.length > 1
        ? after[0] === '0'
          ? after
          : Number(after) % 10 === 0
          ? `${Number(after) / 10}`
          : after
        : after[0] === '0'
        ? ''
        : after;
    dealedBalance = checkedAfter?.length > 0 ? `${before}.${checkedAfter}` : before;
  }
  return dealedBalance.replace('.00', '');
};

export const dealWithAccountAddressDisplay = (address: string, maxToShow: number): string => {
  const maxShow = maxToShow;
  return address?.length > maxShow
    ? address?.slice(0, maxShow / 2) + '...' + address.slice(address?.length - maxShow / 2, address?.length)
    : address;
};

export const setMyInterval = (options: IOptions) => {
  const requestAnimationFrame = window.requestAnimationFrame;
  let i = 1;
  let count = 1;
  options.timer = options.timer || null;
  const loop = () => {
    options.timer = requestAnimationFrame(loop);
    if (i % 60 === 0) {
      const timeout = options.timeout || 1000;
      if (count % parseInt(String(timeout / 1000)) === 0) {
        options.callback && options.callback();
      }
      count++;
    }
    i++;
  };
  options.timer = requestAnimationFrame(loop);
};

export const clearMyInterval = (timer) => {
  const cancelAnimationFrame = window.cancelAnimationFrame;
  cancelAnimationFrame(timer);
};

export const randomNum = () => {
  return parseInt(String(Math.random() * 256 + 1), 10);
};

export const randomDice = () => {
  return parseInt(String(Math.random() * 6 + 1), 10);
};

export const transaction = Sentry?.getCurrentHub()?.getScope()?.getTransaction();

export const shrinkAddress = (address: string): string => {
  const maxShow = 18;
  return address.length > maxShow
    ? address.slice(0, maxShow / 2) + '...' + address.slice(address.length - maxShow / 2, address.length)
    : address;
};

export const detectBrowser = () => {
  const ua = navigator.userAgent;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) return 'mobile';
  else if (/Chrome/i.test(ua)) return 'chrome';
  else return 'other';
};

export const sleep = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
