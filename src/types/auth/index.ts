import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export default interface ButtonProps {
  text?: string;
}

export default interface InputAuthProps {
  name?: string;
  placeHolder?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: void;
}

export default interface WelcomeTitleProps {
  title?: string;
  desc?: string;
}

export type loginUserParams = {
  email: string;
  password: string;
};

export type loginUserResponse = {
  accessToken: string;
  refreshToken: string;
};

export type StartRegisterUserParams = {
  email: string;
};

export type StartRegisterUserResponse = {
  message: string;
  tempUserId: string;
};

export type VerifyEmailParams = {
  tempUserId: number;
  verificationCode: string;
};

export type VerifyEmailResponse = {
  message: string;
  userId: string;
};

export type CompleteRegisterParams = {
  userId: number;
  password: string;
  phoneNumber: string;
};

export type CompleteRegisterResponse = {
  message: string;
  user: {
    id: string;
    role: string;
    membership_date: null;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    verificationCode: number;
    verificationCodeExpires: string;
    fullName: string;
    firstName: string;
    lastName: string;
    profile_picture: null;
    createdAt: string;
    updatedAt: string;
  };
};

export default interface Comment {
  created_at: string;
  caption: string;
  id: string;
}

export default interface ImageAuthProps {
  imageSrc: string | StaticImageData;
  imageTitle: string;
}
