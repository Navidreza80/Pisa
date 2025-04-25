import { ReactNode } from "react";

export default interface ButtonProps {
  text: string;
}

export default interface InputAuthProps {
  name: string;
  placeHolder: string;
  icon: ReactNode;
}

export default interface WelcomeTitleProps {
    title: string;
    desc: string;
}