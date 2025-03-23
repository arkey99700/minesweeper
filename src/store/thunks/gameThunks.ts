import { createAppAsyncThunk } from '../store';
import {
  GameStatuses,
  setSettingsDisplayed,
  setStatus,
} from '../slices/gameSlice';
import { createMinefield, MinefieldParameters } from '../slices/minefieldSlice';
import { startTimer } from './timerThunks';

export const startGame = createAppAsyncThunk(
  'game/start',
  (options: MinefieldParameters, thunkApi) => {
    const { dispatch } = thunkApi;

    dispatch(setSettingsDisplayed(false));
    dispatch(setStatus(GameStatuses.InProgress));
    dispatch(createMinefield(options));
    dispatch(startTimer());
  }
);
