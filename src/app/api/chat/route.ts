import { createServerClient } from "@/lib/supabase";
import { anthropic, buildProspectsContext } from "@/lib/claude";
import { NextResponse } from "next/server";
import { ChatMessage } from "@/lib/types";

export async function POST(req: Request) {
  const { message, history }: { message: string; history: ChatMessage[] } =
    await req.json();

  const supabase = createServerClient();

  const [{ data: prospects }, { data: personaRow }] = await Promise.all([
    supabase.from("prospects").select("*").order("created_at", { ascending: false }),
    supabase.from("persona").select("description").eq("id", 1).single(),
  ]);

  const persona = personaRow?.description ?? "Professional B2B sales rep";
  const context = buildProspectsContext(prospects ?? []);

  const systemPrompt = `You are an AI assistant helping a sales rep manage their LinkedIn outreach.
Your persona: ${persona}

You have access to the following prospect data:

${context}

Answer questions about prospects concisely. When filtering by date (e.g. "no reply last 7 days"), calculate from today's date shown above. When asked to set a persona, confirm the change. Keep answers brief and practical.`;

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ],
  });

  const reply =
    response.content[0].type === "text"
      ? response.content[0].text
      : "Sorry, I couldn't generate a response.";

  return NextResponse.json({ reply });
}
