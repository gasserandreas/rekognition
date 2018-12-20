import { createNetworkError, createInvalidDataError } from './ErrorHandler';
import { getToken } from './sessionUtil';

import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { onError as onErrorLink } from "apollo-link-error";

class GraphApi {
  client = null;
  onAuthError = null;
  onError = null;
  endpoint = null;

  constructor(props) {
    const { endpoint, onError, onAuthError } = props;

    this.endpoint = endpoint;
    this.onError = onError;
    this.onAuthError = onAuthError;

    // create apollo link
    const httpLink = createHttpLink({
      uri: endpoint,
    });

    // set auth
    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = getToken();

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}`: '',
        },
      };
    });

    // error handler
    const errorLink = onErrorLink((obj) => {
      console.log(obj);
      const { graphQLErrors, networkError, response } = obj;
      if (graphQLErrors) {
        const authError = graphQLErrors.find(error => error.extensions.code === 'UNAUTHENTICATED');

        
        if (authError) {
          const { message } = authError;
          onAuthError(message);
        } else {
          // create graphql error
          const dataError = createInvalidDataError(new Error(JSON.stringify(graphQLErrors)), response);
          onError(dataError);
        }
      }

      if (networkError) {
        onError(createNetworkError(networkError, response));
      }
    });

    const link = ApolloLink.from([
      errorLink,
      authLink,
      httpLink,
    ]);

    // create apollo client
    const client = new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });

    this.client = client;
  }

  reset() {
    if (this.client) {
      this.client.resetStore();
    }
  }

  query(query, variables = {}) {
    return this.client.query({
      query,
      variables,
    })
    .then(({ data }) => data);
  }

  mutation(mutation, variables = {}) {
    return this.client.mutate({
      mutation,
      variables,
    })
    .then(({ data }) => data);
  }
}

export default GraphApi;
