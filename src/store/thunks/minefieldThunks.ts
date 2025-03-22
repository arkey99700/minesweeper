import { MinefieldTile, checkForWin } from '../../lib/minefield';
import { createAppAsyncThunk } from '../store';
import {
  flagMinedTiles,
  revealAdjacentTiles,
  revealTile,
  showMinedTiles,
} from '../slices/minefieldSlice';
import { GameStatuses, setStatus } from '../slices/gameSlice';
import { stopTimer } from './timerThunks';

export const checkTile = createAppAsyncThunk(
  'minefield/checkTile',
  (tile: MinefieldTile, thunkApi) => {
    const { dispatch, getState } = thunkApi;

    dispatch(revealTile(tile));

    if (tile.isMined) {
      dispatch(showMinedTiles());
      dispatch(setStatus(GameStatuses.Lost));
      dispatch(stopTimer());
      return;
    }

    const state = getState();
    const { grid, mineCount } = state.minefield;

    if (checkForWin(grid, mineCount)) {
      dispatch(flagMinedTiles());
      dispatch(setStatus(GameStatuses.Won));
      dispatch(stopTimer());
      return;
    }

    dispatch(revealAdjacentTiles(tile));
  }
);
