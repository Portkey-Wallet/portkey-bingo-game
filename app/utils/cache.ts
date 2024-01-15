const cacheStore = new Map<string, any>();

export const getItem = (key: string) => {
  return cacheStore.get(key);
};

export const setItem = (key: string, value: any) => {
  cacheStore.set(key, value);
};
