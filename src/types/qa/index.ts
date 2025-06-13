export interface Question {
  id: number;
  houseId: number;
  userId: number;
  question: string;
  answer: string | null;
  answeredBy: number | null;
  createdAt: Date;
  updatedAt: Date;
}
