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
import { LOCAL_STORAGE_OPTIONS_KEY } from '../../lib/constants';
import { getLocalStorageValue } from '../../lib/localstorage';

export const startGame = createAppAsyncThunk(
  'game/start',
  (options: MinefieldParameters, thunkApi) => {
    const { dispatch } = thunkApi;

    localStorage.setItem(LOCAL_STORAGE_OPTIONS_KEY, JSON.stringify(options));

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

    const minefieldParameters = getLocalStorageValue(LOCAL_STORAGE_OPTIONS_KEY);

    dispatch(setStatus(GameStatuses.InProgress));
    dispatch(createMinefield(minefieldParameters));
    dispatch(resetTimer());
  }
);
