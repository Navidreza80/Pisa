import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HouseFilters } from '@/types/house';

const initialState: HouseFilters = {
  page: 1,
  sort: '',
  order: undefined,
  search: '',
  location: '',
  propertyType: '',
  maxPrice: null,
  minRent: null,
  maxRent: null,
  minMortgage: null,
  maxMortgage: null,
  minArea: null,
  maxArea: null,
  limit: 10,
  transactionType: '',
  minPrice: 0,
  rate: undefined
};

const filterLandingSlice = createSlice({
  name: 'landingFilter',
  initialState,
  reducers: {
    setLandingFilters: (state, action: PayloadAction<Partial<HouseFilters>>) => {
      return { ...state, ...action.payload };
    },
    resetLandingFilters: () => initialState
  }
});

export const { setLandingFilters, resetLandingFilters } = filterLandingSlice.actions;
export default filterLandingSlice.reducer;