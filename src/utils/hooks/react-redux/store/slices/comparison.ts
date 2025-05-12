import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ComparisonIds interface
interface ComparisonIds {
  ids: string[] | null;
}

// ComparisonIds initial state
const initialState: ComparisonIds = {
  ids: [],
};

// Function to create ComparisonIds slice
const comparisonIds = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    setComparisonIds: (state, action: PayloadAction<string | null>) => {
      state.ids?.push(action.payload);
    },
    deleteComparisonIds: (state) => {
      state.ids = [];
    },
  },
});

export const { setComparisonIds, deleteComparisonIds } = comparisonIds.actions;
export default comparisonIds.reducer;
