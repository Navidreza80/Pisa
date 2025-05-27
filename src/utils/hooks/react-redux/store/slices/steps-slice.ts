import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// StepsId interface
interface StepsId {
  id: number;
}

// StepsId initial state
const initialState: StepsId = {
  id: 5,
};

// Function to create StepsId slice
const stepsId = createSlice({
  name: "steps",
  initialState,
  reducers: {
    setStepsId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    restartSteps: (state) => {
      state.id = 1;
    },
  },
});

export const { setStepsId, restartSteps } = stepsId.actions;
export default stepsId.reducer;
