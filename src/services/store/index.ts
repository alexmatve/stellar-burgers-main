import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { Middleware, configureStore, combineReducers } from '@reduxjs/toolkit';


import builderReducer from '../slices/builder';
import userReducer from '../slices/user';
import ordersReducer from '../slices/orders';
import ingredientsReducer from '../slices/ingredient';
import feedReducer from '../slices/feed';

export const rootReducer = combineReducers({
  builder: builderReducer,
  user: userReducer,
  orders: ordersReducer,
  ingredients: ingredientsReducer,
  feed: feedReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;