import rootReducer from '../rootReducer';

describe('root reducer test suite', () => {
  const firstLevelKeys = ['appTime', 'application', 'auth'];

  it('should return root redux object tree', () => {
    expect(Object.keys(rootReducer)).toEqual(firstLevelKeys);
  });
});
