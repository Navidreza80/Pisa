import { auth } from "@/auth";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { ChevronDown, PlusCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DashboardTitle from "@/components/common/dashboard/DashboardTitle";
import Notif2SVG from "@/components/dashboard/svg/Notif2SVG";
import SignoutSVG from "@/components/dashboard/svg/SignoutSVG";
import NotificationSettingModal from "./NotificationSettingModal";
import WarningModal from "./WarningModal";

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

  const dropdownItems = [
    { text: "شارژ کردن کیف پول", icon: <PlusCircle /> },
    { text: "تنظیمات نوتیفیکیشن", icon: <SignoutSVG /> },
    { text: "خروج", icon: <SignoutSVG /> },
  ];
  return (
    <div className="bg-background rounded-[12px] px-[19px] h-[66px] flex justify-between">
      {!decodedUser ? (
        <span></span>
      ) : (
        <div className="flex gap-2 md:gap-4 my-auto">
          <div className="my-auto cursor-pointer">
            <Popover>
              <PopoverTrigger asChild>
                <ChevronDown />
              </PopoverTrigger>
              <PopoverContent className="text-right w-[180px] p-1 bg-background px-1 border-border shadow-sm shadow-border z-[1000]">
                <div className="px-[10px]">
                  <div className="w-full h-full flex flex-col">
                    <div className="py-[10px] w-full flex gap-2 flex-row-reverse">
                      <div className="w-[37px] aspect-square bg-fade rounded-lg " />
                      <div className="flex flex-col">
                        <h1 className="text-[13px] font-medium">
                          امیر محمد ملایی
                        </h1>
                        <h1 className="text-[12px] text-fade font-medium">
                          +989123456789
                        </h1>
                      </div>
                    </div>
                    {dropdownItems.map((item, index) => {
                      return index == 1 ? (
                        <NotificationSettingModal>
                          <div
                            key={index}
                            className="py-[10px] cursor-pointer hover:text-text/80 transition-all duration-300 border-t border-border w-full flex gap-2 text-[13px] font-medium justify-end"
                          >
                            {item.text} {item.icon}
                          </div>
                        </NotificationSettingModal>
                      ) : index == 2 ? (
                        <WarningModal title="آیا از خروج خود مطمعن هستید؟">
                          {" "}
                          <div
                            key={index}
                            className="py-[10px] cursor-pointer hover:text-text/80 transition-all duration-300 border-t border-border w-full flex gap-2 text-[13px] font-medium justify-end"
                          >
                            {item.text} {item.icon}
                          </div>
                        </WarningModal>
                      ) : (
                        <div
                          key={index}
                          className="py-[10px] cursor-pointer hover:text-text/80 transition-all duration-300 border-t border-border w-full flex gap-2 text-[13px] font-medium justify-end"
                        >
                          {item.text} {item.icon}
                        </div>
                      );
                    })}
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
