import { Message } from "@/lib/types";

export default function MessageBubble({ message }: { message: Message }) {
  const isOutbound = message.direction === "outbound";

  return (
    <div className={`flex ${isOutbound ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`max-w-sm px-4 py-2.5 rounded-2xl text-sm ${
        isOutbound
          ? "bg-indigo-600 text-white rounded-br-sm"
          : "bg-white border text-gray-800 rounded-bl-sm"
      }`}>
        <p>{message.body}</p>
        <p className={`text-xs mt-1 ${isOutbound ? "text-indigo-200" : "text-gray-400"}`}>
          {new Date(message.sent_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
