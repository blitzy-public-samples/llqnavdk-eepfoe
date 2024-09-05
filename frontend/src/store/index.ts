import { configureStore } from '@reduxjs/toolkit';
import { applicationReducer } from 'frontend/src/store/applicationSlice';
import { userReducer } from 'frontend/src/store/userSlice';
import { webhookReducer } from 'frontend/src/store/webhookSlice';

// Configure the Redux store with combined reducers
export const store = configureStore({
  reducer: {
    application: applicationReducer,
    user: userReducer,
    webhook: webhookReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;