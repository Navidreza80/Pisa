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
  house: {
    title: string;
    price: string;
  };
  houseId: string;
  reservedDates: ReservedDate[];
  traveler_details: TravelerDetail[];
  status: "pending" | "confirmed" | "canceled";
  sharedEmail: string;
  sharedMobile: string;
  createdAt: string;
  updatedAt: string;
}
