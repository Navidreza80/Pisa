import Button from "@/components/common/button";
import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import EndMessage from "@/components/pages/sd-chats/content/EndMessage";
import SendMessage from "@/components/pages/sd-chats/content/SendMessage";
import ViewChat from "@/components/pages/sd-chats/content/ViewChat";
import formatToPersianDate from "@/utils/helper/format-date";
import getAllChats, {
  getChatHistory,
  getRoomsUsers,
} from "@/utils/service/chats/get";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import Link from "next/link";

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
      <HeaderDashboard title="گفتگو با خریداران" />
      {/* Chat Container */}
      <div className="h-[85vh] custom-scrollbar flex flex-col md:flex-row bg-gray-50 rounded-lg overflow-hidden">
        {/* Sidebar (Chat List) */}
        <div className="w-full md:w-1/4 lg:w-1/5 h-full bg-surface border-l border-border overflow-y-auto">
          {res.length === 0 ? (
            <p className="text-center text-text-secondary py-8 text-sm">
              گفتگویی یافت نشد
            </p>
          ) : (
            res.map((chat) => (
              <ViewChat chat={chat} key={chat.id} isActive={chat.id === room} />
            ))
          )}
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {!isActiveRoom ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="max-w-xs mx-auto">
                {/* Modern icon (replace with your preferred icon library) */}
                <svg
                  className="w-16 h-16 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>

                {/* Improved text hierarchy */}
                <h3 className="text-lg font-medium mb-1">
                  گفتگویی انتخاب نشده
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  برای شروع گفتگو، یک چت را از لیست انتخاب کنید
                </p>

                {/* Optional CTA button */}
                <Link href="/reserve">
                  <Button className="!w-auto mx-auto">مشاهده لیست املاک</Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-surface sticky top-0 z-10">
                {thirdPartyUser ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-semibold">
                      {thirdPartyUser.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{thirdPartyUser.fullName}</p>
                      <p className="text-xs text-text-secondary">
                        {thirdPartyUser.email}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-text-secondary">در انتظار پاسخ...</p>
                )}
              </div>

              {/* Messages Container */}
              <div
                className="flex-1 p-4 overflow-y-auto bg-gray-50 relative"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                }}
              >
                <div className="space-y-3">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className={`flex flex-col ${
                        userId === item.sender.id ? "items-start" : "items-end"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] lg:max-w-[70%] p-3 rounded-2xl ${
                          userId === item.sender.id
                            ? "bg-primary text-surface rounded-tr-none"
                            : "bg-border rounded-tl-none"
                        }`}
                      >
                        <p className="text-sm font-medium">
                          {item.sender.fullName}
                        </p>
                        <p className="text-base">{item.message}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {formatToPersianDate(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <EndMessage history={history} />
                </div>
              </div>

              {/* Message Input */}
              <SendMessage roomId={room} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
