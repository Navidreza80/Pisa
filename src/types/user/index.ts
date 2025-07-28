export interface UserProfileProps {
  user: {
    name?: string;
    updatedAt: Date;
    email: string;
    profilePicture?: string;
    phoneNumber: string;
  };
  additionalPercentage: number;
}

export interface JwtPayload {
  name: string;
  email: string;
  role: string;
  profilePicture: string;
  phoneNumber: string;
  id: string;
}
