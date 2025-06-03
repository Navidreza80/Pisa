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
const bookingStepsId = createSlice({
  name: "steps",
  initialState,
  reducers: {
    setBookingSteps: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    restartBookingSteps: (state) => {
      state.id = 1;
    },
  },
});

export const { setBookingSteps, restartBookingSteps } = bookingStepsId.actions;
export default bookingStepsId.reducer;
