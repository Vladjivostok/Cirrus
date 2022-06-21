import { StorageItem } from '../common/types';

const LocalStorageService = {
  setItem: (item: StorageItem) => {
    localStorage.setItem(item.key, item.value);
  },

  getItem: (item: string) => {
    return localStorage.getItem(item);
  },

  removeItem: (item: string) => {
    localStorage.removeItem(item);
  }
};

export default LocalStorageService;
