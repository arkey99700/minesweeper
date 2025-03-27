import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  MinefieldTile,
  MinefieldGrid,
  createMinefieldGrid,
  revealAdjacentTilesRecursive,
  createEmptyGrid,
} from '../../lib/minefield';
import {
  DEFAULT_MINEFIELD_HEIGHT,
  DEFAULT_MINEFIELD_WIDTH,
} from '../../lib/constants';

export type MinefieldParameters = {
  height: number;
  width: number;
  mineCount: number;
};

export type MinefieldState = MinefieldParameters & {
  flagCount: number;
  grid: MinefieldGrid;
  firstTileRevealed: boolean;
};

const initialState: MinefieldState = {
  width: DEFAULT_MINEFIELD_WIDTH,
  height: DEFAULT_MINEFIELD_HEIGHT,
  mineCount: 0,
  flagCount: 0,
  grid: createEmptyGrid(DEFAULT_MINEFIELD_WIDTH, DEFAULT_MINEFIELD_HEIGHT),
  firstTileRevealed: false,
};

const minefieldSlice = createSlice({
  name: 'minefield',
  initialState,
  reducers: {
    revealTile: (state, action: PayloadAction<MinefieldTile>) => {
      state.grid[action.payload.y][action.payload.x].isRevealed = true;
    },
    setFirstTileRevealed: (state, action: PayloadAction<boolean>) => {
      state.firstTileRevealed = action.payload;
    },
    revealAdjacentTiles: (state, action: PayloadAction<MinefieldTile>) => {
      state.grid = revealAdjacentTilesRecursive(
        state.grid,
        action.payload.x,
        action.payload.y
      );
    },
    revealMinedTiles: (state) => {
      for (const row of state.grid) {
        for (const tile of row) {
          if (tile.isMined && !tile.isFlagged) {
            tile.isRevealed = true;
          }
        }
      }
    },
    flagTile: (state, action: PayloadAction<MinefieldTile>) => {
      if (state.flagCount - 1 >= 0) {
        state.flagCount--;
        state.grid[action.payload.y][action.payload.x].isFlagged = true;
      }
    },
    unflagTile: (state, action: PayloadAction<MinefieldTile>) => {
      state.flagCount++;
      state.grid[action.payload.y][action.payload.x].isFlagged = false;
    },
    flagMinedTiles: (state) => {
      state.grid.map((row) =>
        row.map((cell) => {
          if (cell.isMined) {
            cell.isFlagged = true;
          }

          return cell;
        })
      );
    },
    createMinefield: (state, action: PayloadAction<MinefieldParameters>) => {
      state.grid = createMinefieldGrid(
        action.payload.width,
        action.payload.height,
        action.payload.mineCount
      );
      state.mineCount = state.flagCount = action.payload.mineCount;
    },
  },
});

export const {
  flagTile,
  unflagTile,
  revealTile,
  setFirstTileRevealed,
  revealAdjacentTiles,
  flagMinedTiles,
  createMinefield,
  revealMinedTiles,
} = minefieldSlice.actions;
export default minefieldSlice.reducer;
