export interface Prospect {
  id: string;
  name: string;
  company: string;
  linkedin_url: string | null;
  status: "pending" | "replied" | "no_reply";
  last_contacted: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  prospect_id: string;
  direction: "outbound" | "inbound";
  body: string;
  sent_at: string;
}

export interface Persona {
  id: number;
  description: string;
  updated_at: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
