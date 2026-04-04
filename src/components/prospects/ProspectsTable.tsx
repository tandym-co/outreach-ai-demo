import { Prospect } from "@/lib/types";
import ProspectRow from "./ProspectRow";

export default function ProspectsTable({ prospects }: { prospects: Prospect[] }) {
  const replied = prospects.filter((p) => p.status === "replied").length;
  const noReply = prospects.filter((p) => p.status === "no_reply").length;
  const pending = prospects.filter((p) => p.status === "pending").length;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Replied", count: replied, color: "text-green-600" },
          { label: "No Reply", count: noReply, color: "text-red-500" },
          { label: "Pending", count: pending, color: "text-yellow-500" },
        ].map(({ label, count, color }) => (
          <div key={label} className="bg-white rounded-lg border p-4">
            <p className="text-sm text-gray-500">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{count}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Company", "Status", "Last Contacted", "LinkedIn"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {prospects.map((p) => (
              <ProspectRow key={p.id} prospect={p} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
