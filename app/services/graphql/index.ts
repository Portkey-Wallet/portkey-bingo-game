import { useState } from 'react';
import { did } from '@portkey/did-ui-react';
import * as Apollo from '@apollo/client';
interface useGraphqlRequestProps<R> {
  query: R;
}

function useGraphqlRequest<R extends Apollo.DocumentNode | Apollo.TypedDocumentNode<R, Q>, Q>({
  query,
}: useGraphqlRequestProps<R>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<Apollo.ApolloQueryResult<R> | null>(null);

  const fetch = async (params: Q) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await did.config.graphQLClient.query<R, Q>({
        query: query,
        variables: params,
      });
      setData(result);
      setLoading(false);
      setError(null);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  };

  return { fetch, data, loading, error };
}

export default useGraphqlRequest;
