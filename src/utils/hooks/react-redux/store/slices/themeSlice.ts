import { createSlice } from "@reduxjs/toolkit";

// Theme interface
interface ThemeState {
  theme: string;
}

// Theme initial state
const initialState: ThemeState = {
  theme: "light",
};

// Function to create theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleAppTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleAppTheme } = themeSlice.actions;
export default themeSlice.reducer;
