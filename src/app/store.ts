/* eslint-disable no-underscore-dangle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import chatReducers from '../features/chatReducers';
import loginReducers from '../features/loginReducers';


export const store = configureStore({
  reducer: {
    login: loginReducers,
    chats: chatReducers
  }
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
