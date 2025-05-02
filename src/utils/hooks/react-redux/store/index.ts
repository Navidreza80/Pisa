// Redux for state management
import { configureStore } from "@reduxjs/toolkit";
// Theme Slices
import themeReducer from "./slices/themeSlice";
import reserveFilterReducer from "./slices/reserve-slice";
import landingFilterReducer from "./slices/landing-slice";
import rentFilters from "./slices/rent-slice"

// Function to configure redux store
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    reserveFilters: reserveFilterReducer,
    landingFilters: landingFilterReducer,
    rentFilters: rentFilters,
  },
});

export type AppStore = ReturnType<typeof configureStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
