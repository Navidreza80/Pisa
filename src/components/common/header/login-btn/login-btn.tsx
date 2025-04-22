import ThemeToggle from "../../theme/ThemeToggle";

export default function LoginBtn() {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <button className="py-2 md:py-3.5 px-3 md:px-4 w-auto md:w-[9%] min-w-[129px] bg-[#586CFF] rounded-xl text-white text-center">
        ثبت نام و ورود
      </button>
      <ThemeToggle />
      <ThemeToggle />
    </div>
  );
}
