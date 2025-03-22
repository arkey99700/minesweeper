import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TimerState = {
  time: number;
  timerId?: number;
};

const initialState: TimerState = {
  time: 0,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimerId: (state, action: PayloadAction<number | undefined>) => {
      state.timerId = action.payload;
    },
    incrementTimer: (state) => {
      state.time++;
    },
    clearTimer: (state) => {
      state.time = 0;
    },
  },
});

export const { setTimerId, incrementTimer, clearTimer } = timerSlice.actions;
export default timerSlice.reducer;
