"use client"

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ViewChat = ({ roomId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentRoom = searchParams.get("room");

  const isActive = currentRoom == roomId;

  const handleSetParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };
  return (
    <div
      className={`${isActive ? "text-primary" : "text-text-secondary underline cursor-pointer"}`}
      onClick={() => handleSetParam("room", roomId)}
    >
      ViewChat
    </div>
  );
};
export default ViewChat;
