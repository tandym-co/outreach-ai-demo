import { Prospect } from "@/lib/types";

const styles: Record<Prospect["status"], string> = {
  replied: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  no_reply: "bg-red-100 text-red-800",
};

const labels: Record<Prospect["status"], string> = {
  replied: "Replied",
  pending: "Pending",
  no_reply: "No Reply",
};

export default function StatusBadge({ status }: { status: Prospect["status"] }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
