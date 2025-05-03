'use client';

import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../react-redux/store/hook';
import { fetchHouses } from '@/utils/service/house/get';

export const useHouses = () => {
  const filters = useAppSelector((state) => state.reserveFilters);
  
  return useQuery({
    queryKey: ['houses', filters],
    queryFn: () => fetchHouses(filters),
    staleTime: 0
  });
};

export const useLandingHouses = () => {
  const filters = useAppSelector((state) => state.landingFilters);
  
  return useQuery({
    queryKey: ['houses-landing', filters],
    queryFn: () => fetchHouses(filters),
    staleTime: 0
  });
};

export const useRentHouses = () => {
  const filters = useAppSelector((state) => state.rentFilters);
  
  return useQuery({
    queryKey: ['houses-rent', filters],
    queryFn: () => fetchHouses(filters),
    staleTime: 0
  });
};