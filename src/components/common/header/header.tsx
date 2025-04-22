import LoginBtn from "./login-btn/login-btn";
import Logo from "./logo/logo";
import Navbar from "./navbar/navbar";

export default function Header() {
  return (
    <div
      className="h-20 w-full py-6 flex items-center justify-between"
    >
      <LoginBtn />
      <Navbar />
      <Logo />
    </div>
  );
}
