import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum GameStatusName {
  Paused,
  InProgress,
  PendingReveal,
  Waiting,
  Won,
  Lost,
}

export type GameState = {
  status: GameStatusName;
  settingsDispayed: boolean;
};

const initialState: GameState = {
  status: GameStatusName.Paused,
  settingsDispayed: true,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<GameStatusName>) => {
      state.status = action.payload;
    },
    refreshGame: (state) => {
      state.status = GameStatusName.InProgress;
    },
  },
});

export const { setStatus, refreshGame } = gameSlice.actions;
export default gameSlice.reducer;
