import { getServerCookie } from "@/utils/service/storage/server-cookie";
import DashboardTitle from "./buyer/DashboardTitle";
import ArrowSVG from "./svg/ArrowSVG";
import Notif2SVG from "./svg/Notif2SVG";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { auth } from "@/auth";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

async function HeaderDashboard() {
  const token = await getServerCookie("serverAccessToken");
  var decodedUser;
  if (token) {
    decodedUser =
      typeof token === "string" ? jwtDecode<JwtPayload>(token) : null;
  } else {
    decodedUser = await auth();
    decodedUser = decodedUser?.user;
  }
  return (
    <div className="bg-background rounded-[12px] px-[19px] h-[66px] flex justify-between">
      {!decodedUser ? (
        <span></span>
      ) : (
        <div className="flex gap-2 md:gap-4 my-auto">
          <div className="my-auto cursor-pointer">
            <Popover>
              <PopoverTrigger asChild>
                <ArrowSVG />
              </PopoverTrigger>
              <PopoverContent className="text-right w-32 p-1 bg-background px-1 border-border shadow-sm shadow-border">
                <div>
                  <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border py-1 rounded-2xl px-1">
                    <h1 className="text-center">آیتم</h1>
                  </div>
                  <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border py-1 rounded-2xl px-1">
                    <h1 className="text-center">آیتم</h1>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-2">
            <div className="flex-col flex-wrap justify-between md:flex hidden">
              <h1 className="text-text font-yekan font-bold">
                {decodedUser.name || "User"}
              </h1>
              <p className="text-text-secondary text-[12px] font-yekan font-semibold">
                خریدار
              </p>
            </div>
            <div className="flex-col flex-wrap justify-between md:hidden flex">
              <div className="bg-border rounded-full w-10 h-10"></div>
            </div>
          </div>
          <div className="my-auto cursor-pointer md:flex hidden">
            <Notif2SVG />
          </div>
        </div>
      )}
      <DashboardTitle />
    </div>
  );
}

export default HeaderDashboard;
