import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import timerReducer from "./slices/timerSlice";
import minefieldReducer from "./slices/minefieldSlice";

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

export default store;
