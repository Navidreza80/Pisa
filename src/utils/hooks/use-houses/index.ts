'use client';

import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../react-redux/store/hook';
import { fetchHouses } from '@/utils/service/house/get';

export const useHouses = () => {
  const filters = useAppSelector((state) => state.filters);
  
  return useQuery({
    queryKey: ['houses', filters],
    queryFn: () => fetchHouses(filters),
    staleTime: 5 * 60 * 1000
  });
};