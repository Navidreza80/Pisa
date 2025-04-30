import { SetStateAction } from "react";

export interface HouseInterFace {
  pageNumber: number;
  limit: number;
  sort?: string;
  order?: string;
  capacity?: number;
  address?: string;
}

export interface HouseItemsInterface {
  id: number;
  yard_type?: boolean;
  capacity?: number | undefined;
  title?: string;
  address?: string;
  rate?: number;
  photos?: string[];
  tags?: string[];
  rooms?: number;
  bathrooms?: number;
  price?: string;
  transaction_type?: "rental" | string;
}

export interface TopSaleCardListProps {
  setCurrentLoc: SetStateAction<Array<number>>;
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

export interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  value: number | string | undefined | boolean;
  label: string;
  show?: boolean;
}
