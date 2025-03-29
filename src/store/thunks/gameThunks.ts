import { createAppAsyncThunk } from '../store';
import {
  GameStatuses,
  setSettingsDisplayed,
  setStatus,
} from '../slices/gameSlice';
import {
  createMinefield,
  MinefieldParameters,
  setFirstTileRevealed,
} from '../slices/minefieldSlice';
import { resetTimer } from './timerThunks';
import { STORAGE_OPTIONS_KEY } from '../../lib/constants';
import { getStorageValue, setStorageValue } from '../../lib/storage';

export const startGame = createAppAsyncThunk(
  'game/start',
  (options: MinefieldParameters, thunkApi) => {
    const { dispatch } = thunkApi;

    setStorageValue(STORAGE_OPTIONS_KEY, JSON.stringify(options));

    dispatch(setSettingsDisplayed(false));
    dispatch(setStatus(GameStatuses.InProgress));
    dispatch(createMinefield(options));
  }
);

export const restartGame = createAppAsyncThunk(
  'game/restart',
  (_, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(setFirstTileRevealed(false));

    const minefieldParameters = getStorageValue(STORAGE_OPTIONS_KEY);

    dispatch(setStatus(GameStatuses.InProgress));
    dispatch(createMinefield(minefieldParameters));
    dispatch(resetTimer());
  }
);
