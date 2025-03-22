import {
  combineReducers,
  configureStore,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import gameReducer from './slices/gameSlice';
import timerReducer from './slices/timerSlice';
import minefieldReducer from './slices/minefieldSlice';

const appReducer = combineReducers({
  game: gameReducer,
  minefield: minefieldReducer,
  timer: timerReducer,
});

const store = configureStore({
  reducer: appReducer,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface AppThunkApiConfig {
  state: AppState;
  dispatch: AppDispatch;
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppStore = useStore.withTypes<typeof store>();

export const createAppAsyncThunk =
  createAsyncThunk.withTypes<AppThunkApiConfig>();

export default store;
