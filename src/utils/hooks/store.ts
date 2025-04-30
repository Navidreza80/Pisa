// Redux for state management
import { configureStore } from '@reduxjs/toolkit';
// Theme Slices
import themeReducer from './themeSlice'

// Function to configure redux store
export const store = configureStore({
  reducer: {
    theme: themeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 