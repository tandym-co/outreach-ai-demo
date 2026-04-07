import { Prospect } from "@/lib/types";

const styles: Record<Prospect["status"], { bg: string; color: string }> = {
  replied:  { bg: "rgba(0,245,160,0.12)",   color: "#00A86B" },
  pending:  { bg: "rgba(255,181,71,0.12)",  color: "#D97706" },
  no_reply: { bg: "rgba(255,107,107,0.12)", color: "#EF4444" },
};

const labels: Record<Prospect["status"], string> = {
  replied:  "Replied",
  pending:  "Pending",
  no_reply: "No Reply",
};

export default function StatusBadge({ status }: { status: Prospect["status"] }) {
  const { bg, color } = styles[status];
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: bg, color }}
    >
      {labels[status]}
    </span>
  );
}
