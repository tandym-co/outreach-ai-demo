import { Message } from "@/lib/types";
import MessageBubble from "./MessageBubble";

export default function MessageThread({ messages }: { messages: Message[] }) {
  if (messages.length === 0) {
    return <p className="text-sm text-gray-400 py-8 text-center">No messages yet.</p>;
  }

  return (
    <div className="space-y-1 py-4">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
    </div>
  );
}
