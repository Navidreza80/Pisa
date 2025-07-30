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
  favoriteId: number | null;
  isFavorite: boolean;
  parking: number;
  caption: string;
  id: string;
  yard_type: string;
  capacity: number;
  sellerName: string;
  createdAt: Date;
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
  sellerId: string;
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

type TransactionType =
  | "direct_purchase"
  | "rental"
  | "mortgage"
  | "reservation"
  | "";

type TransactionTypeValue = TransactionType | TransactionType[];

export interface HouseFilters {
  page?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  search?: string;
  location?: string;
  propertyType?: string;
  maxPrice?: number;
  minRent?: number;
  maxRent?: number;
  minMortgage?: number;
  maxMortgage?: number;
  minArea?: number;
  maxArea?: number;
  limit?: number;
  transactionType?: TransactionTypeValue;
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
