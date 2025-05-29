import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// CreateTour interface
interface CreateTour {
  tourName: string;
  tourLocation: string;
  tourImage: string;
  tourDescription: string;
  tags: string;
  price: number | null;
  startDate: Date | null;
  endDate: Date | null;
  services: string;
  facilities: string;
  cancelTill: number | null;
  lat: number | null;
  lng: number | null;
  features: string[];
  schedule:
    | {
        title: string;
        todos: {
          time: string;
          todo: string;
        }[];
      }[]
    | null;
}

// CreateTour initial state
const initialState: CreateTour = {
  tourName: "",
  tourLocation: "",
  tourImage: "",
  tourDescription: "",
  tags: "",
  price: {
    type: "امکان پرداخت اقساطی",
    price: 1500000,
  },
  startDate:  "2025-09-08T00:00:00+03:30",
  endDate:  "2025-09-10T00:00:00+03:30",
  services: "",
  facilities: "",
  cancelTill: 3,
  lat: null,
  lng: null,
  features: [],
  schedule: null,
};

// Function to create ComparisonIds slice
const createTour = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    setTourObject: (state, action: PayloadAction<Partial<CreateTour>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setTourObject } = createTour.actions;
export default createTour.reducer;
