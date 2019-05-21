import getStore from '../getStore';

describe('getStore test suite', () => {
  it('should create and return store & persistor', () => {
    const { store, persistor } = getStore();
    expect(store).toBeTruthy();
    expect(persistor).toBeTruthy();
  });

  it('should return singleton store & persistor instance', () => {
    const { store, persistor } = getStore();
    expect(store).toBeTruthy();
    expect(persistor).toBeTruthy();

    const newStore = getStore();
    expect(newStore.store).toEqual(store);
    expect(newStore.persistor).toEqual(persistor);
  });

  it('should recreate store if force is set', () => {
    const { store, persistor } = getStore();
    expect(store).toBeTruthy();
    expect(persistor).toBeTruthy();

    const secondGetStore = getStore({ force: true });
    expect(store).not.toEqual(secondGetStore.store);
    expect(persistor).not.toEqual(secondGetStore.store);
  });
});
