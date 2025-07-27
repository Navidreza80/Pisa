interface ReservedDate {
  value: string;
  inclusive: boolean;
}

interface TravelerDetail {
  gender: string;
  lastName: string;
  birthDate: string;
  firstName: string;
  nationalId: string;
}

export interface Reservation {
  id: string;
  houseId: number;
  reservedDates: ReservedDate[];
  traveler_details: TravelerDetail[];
  status: string;
  sharedEmail: string;
  sharedMobile: string;
  createdAt: string;
  updatedAt: string;
}
