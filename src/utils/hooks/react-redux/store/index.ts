// Redux for state management
import { configureStore } from '@reduxjs/toolkit';
// Theme Slices
import themeReducer from './slices/themeSlice'
import filterReducer from './slices/filter-slices';

// Function to configure redux store
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    filters: filterReducer
  },
});

export type AppStore = ReturnType<typeof configureStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 