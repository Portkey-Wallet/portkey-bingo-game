export interface SideProps {
  uaString?: string;
}

export enum BetType {
  SMALL,
  BIG,
}

export enum ViewMethods {
  GetAllowance = 'GetAllowance',
  GetBalance = 'GetBalance',
  GetBoutInformation = 'GetBoutInformation',
  GetPlayerInformation = 'GetPlayerInformation',
}

export enum SendMethods {
  Approve = 'Approve',
  Bingo = 'Bingo',
  Play = 'Play',
  Register = 'Register',
}

export type Chain = 'AELF' | 'tDVV' | 'tDVW';
