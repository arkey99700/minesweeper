import { MinefieldParameters } from '../store/slices/minefieldSlice';
import {
  DEFAULT_MINE_COUNT,
  DEFAULT_MINEFIELD_HEIGHT,
  DEFAULT_MINEFIELD_WIDTH,
  LOCAL_STORAGE_OPTIONS_KEY,
} from './constants';

type LocalStorageMap = {
  [LOCAL_STORAGE_OPTIONS_KEY]: MinefieldParameters;
};

export function getLocalStorageValue<T extends keyof LocalStorageMap>(
  key: T
): LocalStorageMap[T] {
  let value: LocalStorageMap[T] = JSON.parse(localStorage.getItem(key) || '');

  switch (key) {
    case LOCAL_STORAGE_OPTIONS_KEY:
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
