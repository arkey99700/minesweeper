import { createAppAsyncThunk } from '../store';
import {
  GameStatuses,
  setSettingsDisplayed,
  setStatus,
} from '../slices/gameSlice';
import { createMinefield, MinefieldParameters } from '../slices/minefieldSlice';
import { restartTimer, startTimer } from './timerThunks';
import {
  DEFAULT_MINEFIELD_WIDTH,
  DEFAULT_MINEFIELD_HEIGHT,
  DEFAULT_MINE_COUNT,
  LOCAL_STORAGE_OPTIONS_KEY,
} from '../../lib/constants';

export const startGame = createAppAsyncThunk(
  'game/start',
  (options: MinefieldParameters, thunkApi) => {
    const { dispatch } = thunkApi;

    localStorage.setItem(LOCAL_STORAGE_OPTIONS_KEY, JSON.stringify(options));

    dispatch(setSettingsDisplayed(false));
    dispatch(setStatus(GameStatuses.InProgress));
    dispatch(createMinefield(options));
    dispatch(startTimer());
  }
);

export const restartGame = createAppAsyncThunk(
  'game/restart',
  (_, thunkApi) => {
    const { dispatch } = thunkApi;

    let minefieldParameters: string | MinefieldParameters = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_OPTIONS_KEY) || ''
    );

    if (
      typeof minefieldParameters !== 'object' ||
      minefieldParameters === null
    ) {
      minefieldParameters = {
        width: DEFAULT_MINEFIELD_WIDTH,
        height: DEFAULT_MINEFIELD_HEIGHT,
        mineCount: DEFAULT_MINE_COUNT,
      };
    } else {
      minefieldParameters.width ??= DEFAULT_MINEFIELD_WIDTH;
      minefieldParameters.height ??= DEFAULT_MINEFIELD_HEIGHT;
      minefieldParameters.mineCount ??= DEFAULT_MINE_COUNT;
    }

    dispatch(setStatus(GameStatuses.InProgress));
    dispatch(createMinefield(minefieldParameters));
    dispatch(restartTimer());
  }
);
