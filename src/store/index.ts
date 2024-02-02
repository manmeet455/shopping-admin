import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from '../features/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { dashboardApi } from '../queries/dashboard';
import { bundlesApi } from '../queries/giftBundles';
import { giftIdeasApis } from '../queries/giftIdea';
import { orderApis } from '../queries/order';
import { userApis } from '../queries/user';
import { uploadApis } from '../queries/upload';
import { productApis } from '../queries/product';


export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    // Add the generated reducer as a specific top-level slice
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [bundlesApi.reducerPath]: bundlesApi.reducer,
    [giftIdeasApis.reducerPath]: giftIdeasApis.reducer,
    [orderApis.reducerPath]: orderApis.reducer,
    [userApis.reducerPath]: userApis.reducer,
    [uploadApis.reducerPath]: uploadApis.reducer,
    [productApis.reducerPath]: productApis.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dashboardApi.middleware,
      bundlesApi.middleware,
      giftIdeasApis.middleware,
      orderApis.middleware,
      userApis.middleware,
      uploadApis.middleware,
      productApis.middleware,
    ),
})
setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
