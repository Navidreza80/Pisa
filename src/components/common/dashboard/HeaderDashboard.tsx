import { auth } from "@/auth";
import DashboardTitle from "@/components/common/dashboard/DashboardTitle";
import Notif2SVG from "@/components/dashboard/svg/Notif2SVG";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { ChevronDown } from "lucide-react";
import DropdownMenu from "./DropdownMenu";
import UserRole from "./UserRole";
import { getTranslations } from "next-intl/server";

async function HeaderDashboard() {
  const t = await getTranslations("Overall");
  const token = await getServerCookie("serverAccessToken");
  let decodedUser;
  if (token) {
    decodedUser =
      typeof token === "string" ? jwtDecode<JwtPayload>(token) : null;
  } else {
    decodedUser = await auth();
    decodedUser = decodedUser?.user;
  }

  return (
    <div className="bg-background animate-fade-down rounded-[12px] px-[19px] h-[66px] flex justify-between">
      {!decodedUser ? (
        <span></span>
      ) : (
        <div className="flex gap-2 md:gap-4 my-auto">
          <div className="my-auto cursor-pointer">
            <Popover>
              <PopoverTrigger asChild>
                <ChevronDown />
              </PopoverTrigger>
              <PopoverContent className=" w-[180px] p-1 bg-background px-1 border-border shadow-sm shadow-border z-[1000]">
                <div className="px-[10px]">
                  <div className="w-full h-full flex flex-col">
                    <div className="py-[10px] w-full flex gap-2 flex-row-reverse">
                      <div className="flex flex-col">
                        <h1 className="text-[13px] font-medium">
                          {decodedUser.name || t("user")}
                        </h1>
                        <h1 className="text-[12px] text-fade font-medium">
                          {decodedUser.phoneNumber || t("anonymous")}
                        </h1>
                      </div>
                    </div>
                    <DropdownMenu />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-2">
            <div className="flex-col flex-wrap justify-between md:flex hidden">
              <h1 className="text-text font-yekan font-bold">
                {decodedUser.name || t("user")}
              </h1>
              <UserRole />
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
