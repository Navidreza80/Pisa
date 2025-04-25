// images
import jangal from "@/assets/images/auth/jangal.png";
// Next built in components
import Image from "next/image";
// Third party components
import Comment from "./common/comment";
import MapSVG from "../common/svg/map";

function Auth() {
  return (
    <div className="max-[1300px]:hidden">
      <div className="relative">
        <Image
          width={704}
          height={720}
          src={jangal}
          alt="جنگل گلستان"
          className="max-h-[calc(100vh-32px)] rounded-[32px]"
        />
        <div className="flex gap-[8px] absolute top-[5%] right-[5%]">
          <h1 className="text-white text-[14px] font-[700]">جنگل گلستان</h1>
          <MapSVG />
        </div>

        <div className="w-full absolute bottom-[5%] right-[0]">
          <Comment />
        </div>
      </div>
    </div>
  );
}

export default Auth;
