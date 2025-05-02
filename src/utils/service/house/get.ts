import axios from '@/utils/interceptor';
import { HouseFilters, HouseItemsInterface } from '@/types/house';

export const fetchHouses = async (params: HouseFilters): Promise<HouseItemsInterface> => {
  // Always include transactionType even if empty
  const requiredParams = {
    transactionType: params.transactionType || '', // Force include
    ...params
  };

  const cleanedParams = Object.fromEntries(
    Object.entries(requiredParams).filter(
      ([_, value]) => value !== undefined && 
      value !== null &&
      !(typeof value === 'number' && isNaN(value))
    )
  );

  return axios.get('/houses', { params: cleanedParams });
};