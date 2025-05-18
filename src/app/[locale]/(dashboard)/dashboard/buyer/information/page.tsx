import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BuyerSideBar from "@/components/dashboard/buyer/BuyerSideBar";
import CameraSVG from "@/components/dashboard/svg/CameraSVG";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { jwtDecode } from "jwt-decode";
import { auth } from "@/auth";
import { JwtPayload } from "@/types/user";
import Image from "next/image";

export default async function Information() {
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
    <div className="flex bg-border justify-between p-[19px]">
      <div className="flex flex-col flex-wrap gap-[19px] w-[80%]">
        <div className="bg-background rounded-[12px] px-[19px] h-[66px] flex justify-between">
          {!decodedUser ? (
            <span></span>
          ) : (
            <div className="flex gap-2 my-auto">
              <div className="flex flex-col flex-wrap justify-between">
                <h1 className="text-text">{decodedUser.name}</h1>
                <p className="text-text-secondary text-[12px]">خریدار</p>
              </div>
                <Image width={37} height={37} className="h-[37px] w-[37px] bg-border rounded-[8px] border-0 my-auto" src={decodedUser.image} alt="" />
            </div>
          )}
          <h1 className="text-xl font-yekan font-bold my-auto">اطلاعات کاربری</h1>
        </div>
        <main className="flex-1 bg-background p-8 rounded-[12px]">
          <div className="mb-8">
            <h2 className="text-text text-[20px] font-extrabold font-yekan">
              عکس نمایه شما
            </h2>
            <p className="text-text-secondary text-[16px] font-[400] font-yekan">
              میتوانید عکس نمایه خود را تغییر دهید
            </p>
            <div className="w-30 h-30 bg-border mx-auto rounded-full relative">
              <input type="file" id="file-upload" className="hidden" />
              <label
                htmlFor="file-upload"
                className="w-[25px] h-[25px] rounded-full bg-primary cursor-pointer flex justify-center absolute top-[15%] right-0 border-background border-[2px]"
              >
                <div className="my-auto">
                  <CameraSVG />
                </div>
              </label>
              <input type="file" id="red" className="hidden" />
              <label
                htmlFor="red"
                className="w-[25px] h-[25px] rounded-full bg-red-500 cursor-pointer flex justify-center absolute bottom-[15%] right-0 border-background border-[2px]"
              ></label>
            </div>
          </div>
          <div className="h-[1px] bg-border" />
          <div className="my-8 flex flex-row-reverse justify-between ml-50">
            <div>
              <h2 className="text-text text-[20px] font-extrabold font-yekan ">
                اطلاعات فردی
              </h2>
              <p className="text-text-secondary text-[16px] font-[400] font-yekan mb-4">
                میتوانید اطلاعات فردی خود را تغییر دهید
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <Button className="bg-primary/80 hover:bg-primary text-white">
                  اعمال تغییرات
                </Button>
                <Button variant="outline">انصراف</Button>
              </div>
            </div>

            <div dir="rtl" className="flex flex-col flex-wrap gap-4 w-100">
              <Input
                name="firstName"
                placeholder="نام"
                className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
              />
              <Input
                name="lastName"
                placeholder="نام خانوادگی"
                className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
              />
              <Input
                name="email"
                placeholder="ایمیل"
                className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
              />
              <Input
                name="phone"
                placeholder="شماره موبایل"
                className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
              />
            </div>
          </div>

          <div className="h-[1px] bg-border" />
          <div className="my-8 flex flex-row-reverse justify-between ml-50">
            <div>
              <h2 className="text-text text-[20px] font-extrabold font-yekan ">
                امنیت
              </h2>
              <p className="text-text-secondary text-[16px] font-[400] font-yekan mb-4">
                میتوانید در این بخش رمز خود را تغییر دهید
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <Button className="bg-primary/80 hover:bg-primary text-white">
                  اعمال تغییرات
                </Button>
                <Button variant="outline">انصراف</Button>
              </div>
            </div>

            <div dir="rtl" className="flex flex-col flex-wrap gap-4 w-100">
              <Input
                placeholder="رمز عبور قبلی"
                className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
              />
              <Input
                placeholder="رمز عبور جدید"
                className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
              />
              <Input
                placeholder="تکرار رمز عبور جدید"
                className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
              />
            </div>
          </div>
        </main>
      </div>
      <div className="w-[19%] h-100vh">
        <BuyerSideBar />
      </div>
    </div>
  );
}
