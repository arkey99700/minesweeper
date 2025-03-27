import { MinefieldTile, isGameWon } from '../../lib/minefield';
import { createAppAsyncThunk } from '../store';
import {
  flagMinedTiles,
  revealAdjacentTiles,
  revealTile,
  revealMinedTiles,
  createMinefield,
  setFirstTileRevealed,
} from '../slices/minefieldSlice';
import { GameStatuses, setStatus } from '../slices/gameSlice';
import { stopTimer } from './timerThunks';
import { LOCAL_STORAGE_OPTIONS_KEY } from '../../lib/constants';
import { getLocalStorageValue } from '../../lib/localstorage';

export const checkTile = createAppAsyncThunk(
  'minefield/checkTile',
  (tile: MinefieldTile, thunkApi) => {
    const { dispatch, getState } = thunkApi;

    if (!getState().minefield.firstTileRevealed) {
      if (tile.isMined) {
        const minefieldParameters = getLocalStorageValue(
          LOCAL_STORAGE_OPTIONS_KEY
        );

        const { x, y } = tile;

        do {
          dispatch(createMinefield(minefieldParameters));
        } while (getState().minefield.grid[y][x].isMined);

        tile = getState().minefield.grid[y][x];
      }

      dispatch(revealTile(tile));
      dispatch(revealAdjacentTiles(tile));
      dispatch(setFirstTileRevealed(true));
      return;
    }

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
