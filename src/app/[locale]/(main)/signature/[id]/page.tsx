/* eslint-disable */
import SignaturePad from "@/components/Signature/Signature";
import { JwtPayload } from "@/types/user";
import { getHouseById } from "@/utils/service/house/get-by-id";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { jwtDecode } from "jwt-decode";

export default async function SignaturePage({ params }: { params: any }) {
  const { id } = params;

  const HouseDetails = await getHouseById(id);
  const token = await getServerCookie("serverAccessToken");
  const decodedUser =
    typeof token === "string" ? jwtDecode<JwtPayload>(token) : null;

  return (
    <div className="max-w-3xl mx-auto">
      <SignaturePad decodedUser={decodedUser} HouseDetails={HouseDetails} />
    </div>
  );
}
