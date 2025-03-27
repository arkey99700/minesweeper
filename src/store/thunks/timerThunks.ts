import { createAppAsyncThunk } from '../store';
import { clearTimer, incrementTimer, setTimerId } from '../slices/timerSlice';

export const startTimer = createAppAsyncThunk(
  'timer/startTimer',
  (_, thunkApi) => {
    if (!thunkApi.getState().timer.timerId) {
      const timerId = setInterval(() => {
        thunkApi.dispatch(incrementTimer());
      }, 1000);

      thunkApi.dispatch(setTimerId(timerId));
    }
  }
);

export const stopTimer = createAppAsyncThunk(
  'timer/stopTimer',
  (_, thunkApi) => {
    clearInterval(thunkApi.getState().timer.timerId);
    thunkApi.dispatch(setTimerId(undefined));
  }
);

export const resetTimer = createAppAsyncThunk(
  'timer/resetTimer',
  (_, thunkApi) => {
    clearInterval(thunkApi.getState().timer.timerId);

    thunkApi.dispatch(clearTimer());
    thunkApi.dispatch(setTimerId(undefined));
  }
);

export const restartTimer = createAppAsyncThunk(
  'timer/restartTimer',
  (_, thunkApi) => {
    clearInterval(thunkApi.getState().timer.timerId);

    thunkApi.dispatch(clearTimer());

    const timerId = setInterval(() => {
      thunkApi.dispatch(incrementTimer());
    }, 1000);

    thunkApi.dispatch(setTimerId(timerId));
  }
);
