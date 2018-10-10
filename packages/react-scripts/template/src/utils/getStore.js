let privateStore;

export function setStore(store) {
  if (!privateStore) {
    privateStore = store;
  }
}

export default function getStore() {
  if (!privateStore) {
    throw new Error('Store must be initialized. Store is not available.');
  }

  return privateStore;
}
