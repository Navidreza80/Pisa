import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import ViewChat from "@/components/pages/sd-chats/content/ViewChat";
import formatToPersianDate from "@/utils/helper/format-date";
import getAllChats from "@/utils/service/chats/get";

const Page = async () => {
  const res = await getAllChats();
  console.log(res);
  return (
    <>
      <HeaderDashboard title="گفتگو با خریداران" />
      {/* Chat Container */}
      <div className="border h-[85vh]">
        <div className="h-full w-1/6 border-l">
          {res.map((chat) => (
            <div
              key={chat.id}
              className="w-full py-2 px-4 text-center border-b"
            >
              <div className="text-center">{chat.message}</div>
              <span className="text-center text-text-secondary text-sm">
                {formatToPersianDate(chat.createdAt)}
              </span>
              <ViewChat roomId={chat.room} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Page;
