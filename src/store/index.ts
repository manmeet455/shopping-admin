import { configureStore } from '@reduxjs/toolkit';
import  authSliceReducer  from '../features/authSlice';

export const store = configureStore({
    reducer: {
      auth: authSliceReducer,
    },
  })



 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch
  