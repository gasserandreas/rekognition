// import { createNetworkError, createInvalidDataError } from './ErrorHandler';
import { getToken } from './sessionUtil';

import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { onError } from "apollo-link-error";

class GraphApi {
  client = null;

  onAuthError = null;
  endpoint = null;

  constructor(props) {
    const { endpoint, onAuthError } = props;

    this.endpoint = endpoint;
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
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }

      if (networkError) {
        console.log(networkError);
      }
    });

    const link = ApolloLink.from([
      errorLink,
      authLink,
      httpLink,
    ]);

    // create apollo client
    const client = new ApolloClient({
      // link: authLink.concat(link),
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
