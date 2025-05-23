import { JSX } from "react";

const ButtonDashboard = ({
  clx,
  text,
  children,
}: {
  clx: string;
  text: string;
  children: JSX.Element;
}) => {
  return (
    <button
      className={`pl-[15px] pr-[3.5px] text-white ${clx} rounded-full flex p-0.5 gap-1`}
    >
      {children}
      {text}
    </button>
  );
};
export default ButtonDashboard;
