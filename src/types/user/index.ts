export interface UserProfileProps {
  user: {
    name?: string;
    email?: string;
    profilePicture?: string;
  };
}

export interface JwtPayload {
  name?: string;
  email?: string;
  profilePicture?: string;
  id?: number;
}

export interface LoginUser {
  accessToken?: string;
  refreshToken?: string;
}
