import { MinefieldTileCoordinates, isGameWon } from '../../lib/minefield';
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
import { STORAGE_OPTIONS_KEY } from '../../lib/constants';
import { getStorageValue } from '../../lib/storage';

export const checkTile = createAppAsyncThunk(
  'minefield/checkTile',
  (coordinates: MinefieldTileCoordinates, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    let tile = getState().minefield.grid[coordinates.y][coordinates.x];

    if (!getState().minefield.firstTileRevealed) {
      if (tile.isMined) {
        const minefieldParameters = getStorageValue(STORAGE_OPTIONS_KEY);

        const { x, y } = tile;

        do {
          dispatch(createMinefield(minefieldParameters));
        } while (getState().minefield.grid[y][x].isMined);

        tile = getState().minefield.grid[y][x];
      }

      dispatch(revealTile({ x: tile.x, y: tile.y }));
      dispatch(revealAdjacentTiles({ x: tile.x, y: tile.y }));
      dispatch(setFirstTileRevealed(true));
      return;
    }

    dispatch(revealTile({ x: tile.x, y: tile.y }));

    if (tile.isMined) {
      dispatch(revealMinedTiles());
      dispatch(setStatus(GameStatuses.Lost));
      dispatch(stopTimer());
      return;
    }

    dispatch(revealAdjacentTiles({ x: tile.x, y: tile.y }));

    const { grid, mineCount } = getState().minefield;

    if (isGameWon(grid, mineCount)) {
      dispatch(flagMinedTiles());
      dispatch(setStatus(GameStatuses.Won));
      dispatch(stopTimer());
      return;
    }
  }
);
