import { createAsyncThunk } from "@reduxjs/toolkit";
import Minefield, { MinefieldTile } from "../../classes/Minefield";
import { AppDispatch, AppState } from "../store";
import {
  flagMinedTiles,
  revealAdjacentTiles,
  revealTile,
  showMinedTiles,
} from "../slices/minefieldSlice";
import { GameStatusName, setStatus } from "../slices/gameSlice";
import { stopTimer } from "./timerThunks";

export const checkTile = createAsyncThunk<
  void,
  MinefieldTile,
  { dispatch: AppDispatch; state: AppState }
>("minefield/checkTile", (tile, thunkApi) => {
  const { dispatch, getState } = thunkApi;

  dispatch(revealTile(tile));

  if (tile.isMined) {
    dispatch(showMinedTiles());
    dispatch(setStatus(GameStatusName.Lost));
    dispatch(stopTimer());
    return;
  }

  const state = getState();
  const { grid, mineCount } = state.minefield;

  if (Minefield.checkForWin(grid, mineCount)) {
    dispatch(flagMinedTiles());
    dispatch(setStatus(GameStatusName.Won));
    dispatch(stopTimer());
    return;
  }

  dispatch(revealAdjacentTiles(tile));
});
