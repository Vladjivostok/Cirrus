import { StorageItem } from '../common/types';

const LocalStorageService = {
  setItem: (item: StorageItem) => {
    localStorage.setItem(item.key, item.value);
  },

  getItem: (item: string) => {
    return localStorage.getItem(item);
  },

  removeItem: () => {
    localStorage.removeItem('user');
  }
};

export default LocalStorageService;
