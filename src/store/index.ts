import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from '../features/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { dashboardApi } from '../queries/dashboard';
import { bundlesApi } from '../queries/giftBundles';
import { giftApis } from '../queries/giftIdea';


export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    // Add the generated reducer as a specific top-level slice
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [bundlesApi.reducerPath]: bundlesApi.reducer,
    [giftApis.reducerPath]: giftApis.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dashboardApi.middleware,
      bundlesApi.middleware,
      giftApis.middleware,
    ),
})
setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
