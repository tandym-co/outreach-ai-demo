type NextAction = "call" | "email" | "follow-up";

const styles: Record<NextAction, string> = {
  call: "bg-blue-100 text-blue-800",
  email: "bg-purple-100 text-purple-800",
  "follow-up": "bg-orange-100 text-orange-800",
};

const labels: Record<NextAction, string> = {
  call: "Call",
  email: "Email",
  "follow-up": "Follow-up",
};

export default function NextActionBadge({ action }: { action: NextAction | null | undefined }) {
  if (!action) return null;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[action]}`}>
      {labels[action]}
    </span>
  );
}
