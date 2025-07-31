import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import ChatContainer from "@/components/pages/sd-chats/container";
import getAllChats, {
  getChatHistory,
  getRoomsUsers,
} from "@/utils/service/chats/get";
import { getServerCookie } from "@/utils/service/storage/server-cookie";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    room: string;
  }>;
}) => {
  const userId = await getServerCookie("userId");
  const res = await getAllChats();
  const { room } = await searchParams;
  const isActiveRoom = room ? true : false;

  let history;
  let thirdPartyUser;
  if (isActiveRoom) {
    history = await getChatHistory(room);
    const users = await getRoomsUsers(room);
    thirdPartyUser = users?.find((user) => user.id !== userId);
  }

  return (
    <>
      <HeaderDashboard title="گفتگو با فروشندگان" />
      <ChatContainer
        isActiveRoom={isActiveRoom}
        room={room}
        userId={userId}
        history={history}
        thirdPartyUser={thirdPartyUser}
        res={res}
      />
    </>
  );
};

export default Page;
