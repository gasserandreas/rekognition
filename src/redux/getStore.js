import configureStore from './configureStore';

let store;
let persistor;

const initStore = () => {
  const storeArtefacts = configureStore();
  store = storeArtefacts.store; // eslint-disable-line prefer-destructuring
  persistor = storeArtefacts.persistor; // eslint-disable-line prefer-destructuring
};

const getStore = (args = { force: false }) => {
  if (args.force) {
    initStore();
  }

  if (!store || !persistor) {
    initStore();
  }

  return {
    store,
    persistor,
  };
};

export const __testables__ = {
  initStore,
  store,
  persistor,
};

export default getStore;
