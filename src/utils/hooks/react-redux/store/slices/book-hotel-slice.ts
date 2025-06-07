import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the TravelerDetails interface
interface TravelerDetails {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  birthDate: string;
  nationalId: string;
}

// Define the BookingState interface
interface BookingState {
  houseId: number | null;
  reservedDates: string[];
  traveler_details: TravelerDetails[];
  sharedEmail: string | null;
  sharedMobile: string | null;
}

// Initial state
const initialState: BookingState = {
  houseId: null,
  reservedDates: [],
  traveler_details: [],
  sharedEmail: null,
  sharedMobile: null,
};

// Create the slice
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setHouseId: (state, action: PayloadAction<number>) => {
      state.houseId = action.payload;
    },
    setReservedDates: (state, action: PayloadAction<string[]>) => {
      state.reservedDates = action.payload;
    },
    addTravelers: (state, action: PayloadAction<TravelerDetails[]>) => {
      state.traveler_details = action.payload;
    },
    removeTraveler: (state, action: PayloadAction<number>) => {
      state.traveler_details = state.traveler_details.filter(
        (_, index) => index !== action.payload
      );
    },
    updateTraveler: (
      state,
      action: PayloadAction<{ index: number; traveler: TravelerDetails }>
    ) => {
      const { index, traveler } = action.payload;
      if (state.traveler_details[index]) {
        state.traveler_details[index] = traveler;
      }
    },
    setSharedEmail: (state, action: PayloadAction<string>) => {
      state.sharedEmail = action.payload;
    },
    setSharedMobile: (state, action: PayloadAction<string>) => {
      state.sharedMobile = action.payload;
    },
    resetBooking: (state) => {
      return { ...initialState }; // Return a new state to reset
    },
  },
});

// Export actions
export const {
  setHouseId,
  setReservedDates,
  addTravelers,
  removeTraveler,
  updateTraveler,
  setSharedEmail,
  setSharedMobile,
  resetBooking,
} = bookingSlice.actions;

// Export reducer
export default bookingSlice.reducer;
