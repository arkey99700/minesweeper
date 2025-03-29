import { MinefieldParameters } from '../store/slices/minefieldSlice';
import {
  DEFAULT_MINE_COUNT,
  DEFAULT_MINEFIELD_HEIGHT,
  DEFAULT_MINEFIELD_WIDTH,
  STORAGE_OPTIONS_KEY,
} from './constants';

type StorageKeyValueMap = {
  [STORAGE_OPTIONS_KEY]: MinefieldParameters;
};

export function getStorageValue<T extends keyof StorageKeyValueMap>(
  key: T,
  storage: Storage = sessionStorage
): StorageKeyValueMap[T] {
  let value: StorageKeyValueMap[T] = JSON.parse(storage.getItem(key) || '');

  switch (key) {
    case STORAGE_OPTIONS_KEY:
      if (typeof value !== 'object' || value === null) {
        value = {
          width: DEFAULT_MINEFIELD_WIDTH,
          height: DEFAULT_MINEFIELD_HEIGHT,
          mineCount: DEFAULT_MINE_COUNT,
        };
      } else {
        value.width ??= DEFAULT_MINEFIELD_WIDTH;
        value.height ??= DEFAULT_MINEFIELD_HEIGHT;
        value.mineCount ??= DEFAULT_MINE_COUNT;
      }
      break;
  }

  return value;
}

export function setStorageValue<T extends keyof StorageKeyValueMap>(
  key: T,
  value: string,
  storage: Storage = sessionStorage
): void {
  storage.setItem(key, value);
}
