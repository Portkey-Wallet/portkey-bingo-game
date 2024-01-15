import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BingoGameInfoQueryVariables = Types.Exact<{
  dto?: Types.InputMaybe<Types.GetBingoDto>;
}>;

export type BingoGameInfoQuery = {
  __typename?: 'Query';
  bingoGameInfo?: {
    __typename?: 'BingoResultDto';
    totalRecordCount: number;
    data?: Array<{
      __typename?: 'BingoGameInfoDto';
      award: number;
      amount: number;
      isComplete: boolean;
      playId: string;
      bingoId: string;
      dices: Array<string | null>;
      playerAddress: string;
      playTime: number;
      bingoTime: number;
      bingoType: number;
      playBlockHeight: number;
      bingoBlockHeight: number;
      playBlockHash: string;
      bingoBlockHash: string;
      playTransactionFee?: { __typename?: 'TransactionFee'; symbol?: string | null; amount: number } | null;
      bingoTransactionFee?: { __typename?: 'TransactionFee'; symbol?: string | null; amount: number } | null;
    } | null> | null;
    stats?: Array<{
      __typename?: 'StatsDto';
      totalWins: number;
      totalPlays: number;
      award: number;
      amount: number;
      playerAddress: string;
    } | null> | null;
  } | null;
};

export const BingoGameInfoDocument = gql`
  query bingoGameInfo($dto: GetBingoDto) {
    bingoGameInfo(dto: $dto) {
      totalRecordCount
      data {
        award
        amount
        isComplete
        playId
        bingoId
        dices
        playerAddress
        playTime
        bingoTime
        bingoType
        playBlockHeight
        bingoBlockHeight
        playBlockHash
        bingoBlockHash
        playTransactionFee {
          symbol
          amount
        }
        bingoTransactionFee {
          symbol
          amount
        }
      }
      stats {
        totalWins
        totalPlays
        award
        amount
        playerAddress
      }
    }
  }
`;

/**
 * __useBingoGameInfoQuery__
 *
 * To run a query within a React component, call `useBingoGameInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useBingoGameInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBingoGameInfoQuery({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useBingoGameInfoQuery(
  baseOptions?: Apollo.QueryHookOptions<BingoGameInfoQuery, BingoGameInfoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BingoGameInfoQuery, BingoGameInfoQueryVariables>(BingoGameInfoDocument, options);
}
export function useBingoGameInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BingoGameInfoQuery, BingoGameInfoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BingoGameInfoQuery, BingoGameInfoQueryVariables>(BingoGameInfoDocument, options);
}
export type BingoGameInfoQueryHookResult = ReturnType<typeof useBingoGameInfoQuery>;
export type BingoGameInfoLazyQueryHookResult = ReturnType<typeof useBingoGameInfoLazyQuery>;
export type BingoGameInfoQueryResult = Apollo.QueryResult<BingoGameInfoQuery, BingoGameInfoQueryVariables>;
