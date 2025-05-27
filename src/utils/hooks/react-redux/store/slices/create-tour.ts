import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// CreateTour interface
interface CreateTour {
  touName: string;
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
  schedule: {
    title: string;
    todos: {
      time: string;
      todo: string;
    }[];
  }[];
}

// CreateTour initial state
const initialState: CreateTour = {
  touName: "",
  tourLocation: "",
  tourImage: "",
  tourDescription: "",
  tags: "",
  price: null,
  startDate: null,
  endDate: null,
  services: "",
  facilities: "",
  cancelTill: null,
  lat: null,
  lng: null,
  features: [],
  schedule: [
    {
      title: "",
      todos: [
        {
          time: "",
          todo: "",
        },
      ],
    },
  ],
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
