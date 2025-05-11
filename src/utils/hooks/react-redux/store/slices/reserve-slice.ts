import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HouseFilters } from '@/types/house';

const initialState: HouseFilters = {
  page: 1,
  sort: 'price',
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

const reserveFilterSlice = createSlice({
  name: 'reserveFilters',
  initialState,
  reducers: {
    setReserveFilters: (state, action: PayloadAction<Partial<HouseFilters>>) => {
      return { ...state, ...action.payload };
    },
    resetReserveFilters: () => initialState
  }
});

export const { setReserveFilters, resetReserveFilters } = reserveFilterSlice.actions;
export default reserveFilterSlice.reducer;