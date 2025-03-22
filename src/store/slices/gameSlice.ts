import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const GameStatuses = {
  Paused: 0,
  InProgress: 1,
  PendingReveal: 2,
  Waiting: 3,
  Won: 4,
  Lost: 5,
} as const;

export type GameStatus = (typeof GameStatuses)[keyof typeof GameStatuses];

export interface GameState {
  status: GameStatus;
  settingsDispayed: boolean;
}

const initialState: GameState = {
  status: GameStatuses.Paused,
  settingsDispayed: true,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<GameStatus>) => {
      state.status = action.payload;
    },
    refreshGame: (state) => {
      state.status = GameStatuses.InProgress;
    },
  },
});

export const { setStatus, refreshGame } = gameSlice.actions;
export default gameSlice.reducer;
