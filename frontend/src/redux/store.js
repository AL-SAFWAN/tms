import { configureStore } from '@reduxjs/toolkit';
import { ticketApi } from './api/ticket';
import { authApi } from './api/auth';
import user, { userSlice } from './slice/user';
import { adminApi } from './api/admin';
import { commentsApi } from './api/comment';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    user: userSlice.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ticketApi.middleware,
      commentsApi.middleware,
      adminApi.middleware,
      authApi.middleware,
    ]),
});

store.subscribe(() => {
  try {
    const serializedState = JSON.stringify(store.getState().user);
    console.log(serializedState);
    localStorage.setItem('user', serializedState);
  } catch (e) {
    console.error('Could not save state to local storage:', e);
  }
});
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
