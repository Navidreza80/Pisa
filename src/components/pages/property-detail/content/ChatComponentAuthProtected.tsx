import useAuth from "@/utils/hooks/useAuth";
import ChatComponent from "./ChatComponent";

const ChatComponentAuthProtected = ({ sellerId, houseId }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? (
    <ChatComponent sellerId={sellerId} houseId={houseId} />
  ) : null;
};
export default ChatComponentAuthProtected;
