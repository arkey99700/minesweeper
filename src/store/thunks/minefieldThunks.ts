import { MinefieldTile, isGameWon } from '../../lib/minefield';
import { createAppAsyncThunk } from '../store';
import {
  flagMinedTiles,
  revealAdjacentTiles,
  revealTile,
  revealMinedTiles,
} from '../slices/minefieldSlice';
import { GameStatuses, setStatus } from '../slices/gameSlice';
import { stopTimer } from './timerThunks';

export const checkTile = createAppAsyncThunk(
  'minefield/checkTile',
  (tile: MinefieldTile, thunkApi) => {
    const { dispatch, getState } = thunkApi;

    dispatch(revealTile(tile));

    if (tile.isMined) {
      dispatch(revealMinedTiles());
      dispatch(setStatus(GameStatuses.Lost));
      dispatch(stopTimer());
      return;
    }

    dispatch(revealAdjacentTiles(tile));

    const { grid, mineCount } = getState().minefield;

    if (isGameWon(grid, mineCount)) {
      dispatch(flagMinedTiles());
      dispatch(setStatus(GameStatuses.Won));
      dispatch(stopTimer());
      return;
    }
  }
);
