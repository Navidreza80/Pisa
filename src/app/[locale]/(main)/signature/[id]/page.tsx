// Third party components
import { auth } from "@/auth";
import SignaturePad from "@/components/Signature/Signature";
import { JwtPayload } from "@/types/user";
import { getHouseById } from "@/utils/service/house/get-by-id";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { jwtDecode } from "jwt-decode";

/**
 * Signature page
 *
 * @page
 * @route /signature
 *
 *
 */
interface SignatureProps {
  params: { id: number };
}

export default async function SignaturePage({ params: { id } }: SignatureProps) {
  const HouseDetails = await getHouseById(id);

    const token = await getServerCookie("serverAccessToken");
    var decodedUser;
    if (token) {
      decodedUser =
      typeof token === "string" ? jwtDecode<JwtPayload>(token) : null;
      console.log(decodedUser)
    } else {
      decodedUser = await auth();
      decodedUser = decodedUser?.user
    }
  return (
    <div className="max-w-3xl mx-auto">
      <SignaturePad decodedUser={decodedUser} HouseDetails={HouseDetails} />
    </div>
  );
}
