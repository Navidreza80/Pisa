import { auth } from "@/auth";
import { cache } from "react";
import DashboardTitle from "@/components/common/dashboard/DashboardTitle";
import Notif2SVG from "@/components/dashboard/svg/Notif2SVG";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { jwtDecode } from "jwt-decode";
import ChevronDown from "../svg/chervonDown";
import DropdownMenu from "./DropdownMenu";
import UserRole from "./UserRole";
import { getTranslations } from "next-intl/server";
import { JwtPayload } from "@/types/user";
import NoImage from "@/assets/images/no.jpg"
import Image from "next/image";

const HeaderDashboard = cache(async ({ title }: { title: string }) => {
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
      {/* Title */}
      <DashboardTitle title={title} />
      {!decodedUser ? (
        <span></span>
      ) : (
        <div className="flex gap-2 md:gap-4 my-auto">
          {/* Notifications */}
          <div className="my-auto cursor-pointer md:flex hidden">
            <Notif2SVG />
          </div>

          {/* User Profile Section */}
          <div className="flex gap-2 items-center">
            <Image
              src={decodedUser?.profilePicture && decodedUser.profilePicture !== "" ? decodedUser?.profilePicture : NoImage}
              alt="User profile pic"
              width={37}
              height={37}
              className="w-[37px] aspect-square border border-border rounded-lg"
            />
            <div className="flex-col flex-wrap justify-between md:flex hidden">
              <h1 className="text-text font-yekan font-bold">
                {decodedUser.name || t("user")}
              </h1>
              <UserRole />
            </div>
          </div>

          {/* User Popover */}
          <div className="my-auto cursor-pointer">
            <Popover>
              <PopoverTrigger asChild>
                <ChevronDown />
              </PopoverTrigger>
              <PopoverContent className="rounded-xl !w-auto p-1 bg-background px-1 border-border shadow-none shadow-border z-[1000]">
                <div className="px-[10px]">
                  <div className="w-full h-full flex flex-col">
                    <div className="py-[10px] w-full flex gap-2 flex-row">
                      <Image
                        src={decodedUser.profilePicture}
                        alt="User profile pic"
                        width={37}
                        height={37}
                        className="w-[37px] aspect-square border border-border rounded-lg"
                      />
                      <div className="flex flex-col">
                        <h1 className="text-[13px] font-medium whitespace-nowrap">
                          {decodedUser.name || t("user")}
                        </h1>
                        <h1 className="text-[12px] text-fade font-medium">
                          {decodedUser.phoneNumber || "شماره موبایل"}
                        </h1>
                      </div>
                    </div>
                    <DropdownMenu />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
});

export default HeaderDashboard;
