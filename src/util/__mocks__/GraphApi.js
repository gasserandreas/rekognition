// store mock data
let queryCounter = 0;
let queryMockResponses = [];

let mutationCounter = 0;
let mutationMockResponses = [];

export const mockReset = jest.fn().mockImplementation(() => true);

export const mockQuery = jest.fn().mockImplementation(() => {
  const data = queryMockResponses[queryCounter] || {};
  queryCounter += 1;
  return Promise.resolve(data);
});

export const mockMutation = jest.fn().mockImplementation(() => {
  const data = mutationMockResponses[mutationCounter] || {};
  mutationCounter += 1;
  return Promise.resolve(data);
});

const mock = jest.fn().mockImplementation(() => ({
  // api implementation
  reset: mockReset,
  query: mockQuery,
  mutation: mockMutation,
  mockQueryResponses: (responses) => {
    queryMockResponses = responses;
  },
  mockQueryResponseOnce: (response) => {
    queryMockResponses = [response];
  },
  mockMutationResponses: (responses) => {
    mutationMockResponses = responses;
  },
  mockMutationResponseOnce: (response) => {
    mutationMockResponses = [response];
  },
  resetMocks: () => {
    // reset data
    queryCounter = 0;
    queryMockResponses = [];

    mutationCounter = 0;
    mutationMockResponses = [];

    // reset mocks
    mockReset.mockClear();
    mockQuery.mockClear();
    mockMutation.mockClear();
  },
}));

export default mock;
