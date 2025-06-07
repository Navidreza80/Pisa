import { Dispatch, SetStateAction } from "react";

export interface HouseInterFace {
  pageNumber: number;
  limit: number;
  sort?: string;
  order?: string;
  capacity?: number;
  address?: string;
}

export interface HouseItemsInterface {
  parking: number;
  id: number;
  yard_type: string;
  capacity: number;
  categories: {
    id: number;
    name: string;
  };
  title: string;
  address: string;
  rate: number;
  photos: string[];
  tags: string[];
  rooms: number;
  bathrooms: number;
  price: string;
  transaction_type: "rental" | "direct_purchase" | "reservation" | "mortgage";
  location: {
    lat: number;
    lng: number;
  };
}

export interface TopSaleCardListProps {
  isList?: boolean;
  setCurrentLoc?: Dispatch<SetStateAction<[number, number]>>;
  showOnMap?: boolean;
  showFacilities?: boolean;
  minWidth?: string;
  width?: string;
  card: HouseItemsInterface;
  showYard?: boolean;
  showCapacity?: boolean;
  showRooms?: boolean;
  showBathrooms?: boolean;
  showParking?: boolean;
  discount?: boolean;
  capacity?: number;
}

export interface HouseFilters {
  page?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  search?: string;
  location?: string;
  propertyType?: string;
  maxPrice?: number | null;
  minRent?: number | null;
  maxRent?: number | null;
  minMortgage?: number | null;
  maxMortgage?: number | null;
  minArea?: number | null;
  maxArea?: number | null;
  limit?: number;
  transactionType?: string;
  minPrice?: number;
  rate?: number;
}

export interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  value: number | string | undefined | boolean;
  label: string;
  show?: boolean;
}

export interface Location {
  area_name: string;
  id: number;
}
