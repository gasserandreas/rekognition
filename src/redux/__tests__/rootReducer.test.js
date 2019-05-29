import rootReducer from '../rootReducer';

describe('root reducer test suite', () => {
  const firstLevelKeys = [
    'appTime',
    'application',
    'auth',
    'images',
    'labels',
    'faces',
    'user',
  ];

  it('should return root redux object tree', () => {
    expect(Object.keys(rootReducer)).toEqual(firstLevelKeys);
  });
});
