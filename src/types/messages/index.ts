export default interface Message {
  id: string;
  content: string;
  sender: { name: string | null; isAdmin: boolean };
  createdAt: Date;
}
