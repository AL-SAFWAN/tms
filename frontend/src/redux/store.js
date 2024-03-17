import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slice/user';

import { ticketApi } from './api/ticket';
import { authApi } from './api/auth';
import { adminApi } from './api/admin';
import { commentsApi } from './api/comment';
import { logsApi } from './api/logs';
import { rtkQueryErrorLogger } from './middleware';
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [logsApi.reducerPath]: logsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ticketApi.middleware,
      commentsApi.middleware,
      adminApi.middleware,
      logsApi.middleware,
      authApi.middleware,
      rtkQueryErrorLogger,
    ]),
});

store.subscribe(() => {
  try {
    const serializedState = JSON.stringify(store.getState().user);
    localStorage.setItem('user', serializedState);
  } catch (e) {
    console.error('Could not save state to local storage:', e);
  }
});
