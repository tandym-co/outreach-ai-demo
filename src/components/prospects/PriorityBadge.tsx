import { Prospect } from "@/lib/types";

const styles: Record<Prospect["priority"], { bg: string; color: string }> = {
  high:   { bg: "rgba(255,107,107,0.12)", color: "#EF4444" },
  medium: { bg: "rgba(255,181,71,0.12)",  color: "#D97706" },
  low:    { bg: "rgba(0,245,160,0.12)",   color: "#00A86B" },
};

const labels: Record<Prospect["priority"], string> = {
  high:   "High",
  medium: "Medium",
  low:    "Low",
};

export default function PriorityBadge({ priority }: { priority: Prospect["priority"] }) {
  const { bg, color } = styles[priority];
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: bg, color }}
    >
      {labels[priority]}
    </span>
  );
}
