export interface Tour {
  id: string;
  userId: string | undefined;
  tourName: string;
  tourLocation: string;
  tourImage: string;
  tourDescription: string;
  tags: string | undefined;
  price: Record<string, any>;
  startDate: Date;
  services: string[];
  facilities: string[];
  cancelTill: number;
  createdAt: Date;
  updatedAt: Date;
  lat: string | undefined;
  lng: string | undefined;
  features: string[];
  endDate: Date | undefined;
  schedule: Record<string, any>[];
}
