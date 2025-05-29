import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// StepsId interface
interface StepsId {
  id: number;
}

// StepsId initial state
const initialState: StepsId = {
  id: 1,
};

// Function to create StepsId slice
const tourStepsId = createSlice({
  name: "steps",
  initialState,
  reducers: {
    setTourStepsId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    restartTourSteps: (state) => {
      state.id = 1;
    },
  },
});

export const { setTourStepsId, restartTourSteps } = tourStepsId.actions;
export default tourStepsId.reducer;
