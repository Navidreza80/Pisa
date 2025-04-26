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
    title: string;
    address: string;
    photos: string[];
    bathrooms: number;
    parking: number;
    rooms: number;
    price: number;
    yard_type: boolean;
  }