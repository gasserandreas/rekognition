import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

import { createNetworkError } from './ErrorHandler';
import { getToken } from './sessionUtil';

const getAuthToken = (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}`: '',
    },
  };
};

class GraphApi {
  client = null;
  onAuthError = null;
  endpoint = null;

  handleResponse = this.handleResponse.bind(this);

  constructor(props) {
    const { endpoint, onAuthError } = props;

    this.endpoint = endpoint;
    this.onAuthError = onAuthError;

    // create apollo link
    const httpLink = createHttpLink({
      uri: endpoint,
    });

    const authLink = setContext(getAuthToken);

    const link = ApolloLink.from([
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

  handleNetworkError(error) {
    const networkError = createNetworkError(error, {});
    return Promise.reject(networkError);
  }

  handleGraphError({ extensions, message, path }) {
    const error = {
      code: extensions ? extensions.code : null,
      message,
      path,
    };

    if (error.code === 'UNAUTHENTICATED') {
      // handle auth error
      this.onAuthError(error);
    }

    return error;
  }

  handleResponse(response) {
    const { data } = response;
    const errors = response.errors || [];

    switch (errors.length) {
      case 0:
        return Promise.resolve(data);
      case 1:
        return Promise.reject(this.handleGraphError(errors[0]));
      default:
        return Promise.reject(errors.map(error => this.handleGraphError(error)));
    }
  }

  query(query, variables = {}) {
    return this.client.query({
      query,
      variables,
      errorPolicy: 'all',
    })
    .catch(this.handleNetworkError)
    .then(this.handleResponse);
  }

  mutation(mutation, variables = {}) {
    return this.client.mutate({
      mutation,
      variables,
      errorPolicy: 'all',
    })
    .catch(this.handleNetworkError)
    .then(this.handleResponse);
  }
}

export const __testables__ = {
  getAuthToken,
}

export default GraphApi;
