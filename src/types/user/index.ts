export interface UserProfileProps {
  user: {
    name?: string;
    email: string;
    profilePicture?: string;
    phoneNumber: string;
  };
}

export interface JwtPayload {
  name: string;
  email: string;
  profilePicture?: string;
  phoneNumber: string;
  id: string;
}
