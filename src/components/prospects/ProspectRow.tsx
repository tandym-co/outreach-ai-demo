import Link from "next/link";
import { Prospect } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import NextActionBadge from "./NextActionBadge";
import EngagementScore from "./EngagementScore";

export default function ProspectRow({ prospect }: { prospect: Prospect }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ backgroundColor: "rgba(77,217,255,0.12)", color: "#0A1628" }}
          >
            {prospect.name.charAt(0)}
          </div>
          <Link href={`/prospects/${prospect.id}`} className="font-semibold text-sm hover:underline" style={{ color: "#0A1628" }}>
            {prospect.name}
          </Link>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prospect.company}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={prospect.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <EngagementScore score={prospect.engagement_score} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <NextActionBadge action={prospect.next_action} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
        {prospect.last_contacted ?? "—"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {prospect.linkedin_url ? (
          <a href={prospect.linkedin_url} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline" style={{ color: "#4DD9FF" }}>
            View →
          </a>
        ) : (
          <span className="text-gray-300">—</span>
        )}
      </td>
    </tr>
  );
}
