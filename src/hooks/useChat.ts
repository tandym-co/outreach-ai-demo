"use client";

import { useState, useCallback } from "react";
import { ChatMessage } from "@/lib/types";

export function useChat(onPersonaChange?: (p: string) => void) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      // Detect persona change
      const personaMatch = trimmed.match(/set persona to[:\s]+(.+)/i);
      if (personaMatch) {
        const newPersona = personaMatch[1].trim();
        await fetch("/api/persona", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: newPersona }),
        });
        onPersonaChange?.(newPersona);
      }

      const userMsg: ChatMessage = { role: "user", content: trimmed };
      const updated = [...messages, userMsg];
      setMessages(updated);
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history: messages }),
        });
        const { reply } = await res.json();
        setMessages([...updated, { role: "assistant", content: reply }]);
      } catch {
        setMessages([
          ...updated,
          { role: "assistant", content: "Something went wrong. Please try again." },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, onPersonaChange]
  );

  return { messages, loading, send };
}
