import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const GameStatuses = {
  Paused: 'paused',
  InProgress: 'in-progress',
  PendingReveal: 'pending-reveal',
  Waiting: 'waiting',
  Won: 'won',
  Lost: 'lost',
} as const;

export type GameStatus = (typeof GameStatuses)[keyof typeof GameStatuses];

export type GameState = {
  status: GameStatus;
  settingsDispayed: boolean;
};

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
    setSettingsDisplayed: (state, action: PayloadAction<boolean>) => {
      state.settingsDispayed = action.payload;
    },
  },
});

export const { setStatus, refreshGame, setSettingsDisplayed } =
  gameSlice.actions;
export default gameSlice.reducer;
