import AdminChatInterface from "@/components/admin/admin-chat";
import { getConversations } from "@/lib/actions/conversation";

export default async function AdminChatPage() {
  const conversations = await getConversations();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Conversations</h1>
      <AdminChatInterface initialConversations={conversations} />
    </div>
  );
}