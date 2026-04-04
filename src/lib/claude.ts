import Anthropic from "@anthropic-ai/sdk";
import { Prospect } from "./types";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export function buildProspectsContext(prospects: Prospect[]): string {
  const today = new Date().toISOString().split("T")[0];

  const lines = prospects.map((p) =>
    [
      `- ${p.name} at ${p.company}`,
      `  Status: ${p.status}`,
      `  Last contacted: ${p.last_contacted ?? "never"}`,
      `  LinkedIn: ${p.linkedin_url ?? "not provided"}`,
    ].join("\n")
  );

  return `Today's date: ${today}\n\nProspects (${prospects.length} total):\n\n${lines.join("\n\n")}`;
}
