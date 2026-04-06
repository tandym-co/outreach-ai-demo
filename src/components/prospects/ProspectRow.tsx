import Link from "next/link";
import { Prospect } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import NextActionBadge from "./NextActionBadge";

export default function ProspectRow({ prospect }: { prospect: Prospect }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <Link href={`/prospects/${prospect.id}`} className="font-medium text-indigo-600 hover:text-indigo-800">
          {prospect.name}
        </Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{prospect.company}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={prospect.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <NextActionBadge action={prospect.next_action} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {prospect.last_contacted ?? "—"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {prospect.linkedin_url ? (
          <a href={prospect.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
            View
          </a>
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>
    </tr>
  );
}
