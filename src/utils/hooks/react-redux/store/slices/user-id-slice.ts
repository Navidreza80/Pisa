import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// UserId interface
interface UserId {
  userId: number | null;
}

// UserId initial state
const initialState: UserId = {
  userId: null,
};

// Function to create userId slice
const userIdSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number | null>) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = userIdSlice.actions;
export default userIdSlice.reducer;