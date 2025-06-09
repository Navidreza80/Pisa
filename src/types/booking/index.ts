export interface TravelerData {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  birthDate: string;
  nationalId: string;
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  nationalId?: string;
  birthDate?: string;
}
