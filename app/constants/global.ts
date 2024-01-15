import { IPhoneCountry } from '@portkey/did-ui-react';
import COUNTRY_CODE_DATA from './countryCodeList.json';

// you can determine the max and min bet value here
const MIN_BET_VALUE = 1;
const MAX_BET_VALUE = 100;
const INITIAL_INPUT_VALUE = `${MIN_BET_VALUE}`;

const TOKEN_UNIT = 'ELF';

// you can determine the default country code here
const DEFAULT_COUNTRY_CODE = { country: 'Singapore' } as Partial<IPhoneCountry>;
const DEFAULT_COUNTRY_CODE_CONFIG = Object.assign({}, COUNTRY_CODE_DATA, DEFAULT_COUNTRY_CODE) as IPhoneCountry;

const DEFAULT_DICE_INTERVAL_DURATION = 200;
const DEFAULT_DICE_TIMEOUT_DURATION = 5000;
const DEFAULT_DECIMAL = 100000000;

const SHOW_LOGIN_WITH_PORTKEY = process.env.NEXT_PUBLIC_APP_ENV !== 'main';
const BINGO_KEY_NAME = 'BINGO_GAME';
const IS_PROVIDER_LOGIN = 'IS_PROVIDER_LOGIN';

const XSTATE_DEVTOOLS = process.env.NEXT_PUBLIC_APP_ENV === 'development';

/**
 * Duration in secs to wait for bingo.
 */
const COUNT = 15;

export {
  MIN_BET_VALUE,
  MAX_BET_VALUE,
  INITIAL_INPUT_VALUE,
  TOKEN_UNIT,
  DEFAULT_COUNTRY_CODE_CONFIG,
  DEFAULT_DICE_INTERVAL_DURATION,
  DEFAULT_DICE_TIMEOUT_DURATION,
  SHOW_LOGIN_WITH_PORTKEY,
  BINGO_KEY_NAME,
  IS_PROVIDER_LOGIN,
  XSTATE_DEVTOOLS,
  COUNT,
  DEFAULT_DECIMAL,
};
