import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, AppState } from "../store";
import { clearTimer, incrementTimer, setTimerId } from "../slices/timerSlice";

export const startTimer = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: AppState }
>("timer/startTimer", (_, thunkApi) => {
  if (!thunkApi.getState().timer.timerId) {
    const timerId = setInterval(() => {
      thunkApi.dispatch(incrementTimer());
    }, 1000);

    thunkApi.dispatch(setTimerId(timerId));
  }
});

export const stopTimer = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: AppState }
>("timer/stopTimer", (_, thunkApi) => {
  clearInterval(thunkApi.getState().timer.timerId);
  thunkApi.dispatch(setTimerId(undefined));
});

export const restartTimer = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: AppState }
>("timer/restartTimer", (_, thunkApi) => {
  clearInterval(thunkApi.getState().timer.timerId);

  thunkApi.dispatch(clearTimer());

  const timerId = setInterval(() => {
    thunkApi.dispatch(incrementTimer());
  }, 1000);

  thunkApi.dispatch(setTimerId(timerId));
});
