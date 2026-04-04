export const dynamic = "force-dynamic";

import ChatWindow from "@/components/chat/ChatWindow";

async function getPersona(): Promise<string> {
  try {
    const { createServerClient } = await import("@/lib/supabase");
    const supabase = createServerClient();
    const { data } = await supabase
      .from("persona")
      .select("description")
      .eq("id", 1)
      .single();
    return data?.description ?? "Professional B2B sales rep";
  } catch {
    return "Professional B2B sales rep";
  }
}

export default async function ChatPage() {
  const persona = await getPersona();

  return (
    <div className="h-full flex flex-col">
      <div className="px-8 py-4 border-b bg-white">
        <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
        <p className="text-sm text-gray-500 mt-0.5">Ask questions about your prospects or update your outreach persona</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatWindow initialPersona={persona} />
      </div>
    </div>
  );
}
