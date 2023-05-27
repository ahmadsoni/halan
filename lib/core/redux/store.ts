import {configureStore} from '@reduxjs/toolkit';
const createDebugger = require('redux-flipper').default;
import navReducer from './slices/navSlices';
const configureCustomStore = () => {
  const rootReducer = {
    nav: navReducer,
  };

  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      __DEV__
        ? getDefaultMiddleware({serializableCheck: false}).concat(
            createDebugger(),
          )
        : getDefaultMiddleware({
            serializableCheck: false,
          }),
  });

  return {store};
};

export const {store} = configureCustomStore();
