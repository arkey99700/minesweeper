import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  createGrid,
  MinefieldTile,
  revealMinedTiles,
  revealAdjacentTiles as doRevealAdjacentTiles,
  flagMinedTiles as doFlagMinedTiles,
} from '../../lib/minefield';

export interface MinefieldState {
  width: number;
  height: number;
  mineCount: number;
  flagCount: number;
  grid: MinefieldTile[][];
}

const DEFAULT_MINEFIELD_WIDTH = 10;
const DEFAULT_MINEFIELD_HEIGHT = 10;

const initialState: MinefieldState = {
  width: DEFAULT_MINEFIELD_WIDTH,
  height: DEFAULT_MINEFIELD_HEIGHT,
  mineCount: 0,
  flagCount: 0,
  grid: createGrid(DEFAULT_MINEFIELD_WIDTH, DEFAULT_MINEFIELD_HEIGHT, 0),
};

const minefieldSlice = createSlice({
  name: 'minefield',
  initialState,
  reducers: {
    revealTile: (state, action: PayloadAction<MinefieldTile>) => {
      state.grid[action.payload.y][action.payload.x].isRevealed = true;
    },
    revealAdjacentTiles: (state, action: PayloadAction<MinefieldTile>) => {
      state.grid = doRevealAdjacentTiles(
        state.grid,
        action.payload.x,
        action.payload.y
      );
    },
    showMinedTiles: (state) => {
      state.grid = revealMinedTiles(state.grid);
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
      state.grid = doFlagMinedTiles(state.grid);
    },
    createField: (
      state,
      action: PayloadAction<{
        height: number;
        width: number;
        mineCount: number;
      }>
    ) => {
      state.grid = createGrid(
        action.payload.height,
        action.payload.width,
        action.payload.mineCount
      );
      state.flagCount = action.payload.mineCount;
    },
  },
});

export const {
  flagTile,
  unflagTile,
  revealTile,
  revealAdjacentTiles,
  flagMinedTiles,
  createField,
  showMinedTiles,
} = minefieldSlice.actions;
export default minefieldSlice.reducer;
