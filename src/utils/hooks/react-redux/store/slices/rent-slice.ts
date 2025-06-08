import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HouseFilters } from '@/types/house';

const initialState: HouseFilters = {
  page: 1,
  sort: 'price',
  order: undefined,
  search: '',
  location: '',
  propertyType: '',
  maxPrice: undefined,
  minRent: undefined,
  maxRent: undefined,
  minMortgage: undefined,
  maxMortgage: undefined,
  minArea: undefined,
  maxArea: undefined,
  limit: 10,
  transactionType: '',
  minPrice: 0,
  rate: undefined
};

const filterRentSlice = createSlice({
  name: 'landingFilter',
  initialState,
  reducers: {
    setRentFilters: (state, action: PayloadAction<Partial<HouseFilters>>) => {
      return { ...state, ...action.payload };
    },
    resetRentFilters: () => initialState
  }
});

export const { setRentFilters, resetRentFilters } = filterRentSlice.actions;
export default filterRentSlice.reducer;