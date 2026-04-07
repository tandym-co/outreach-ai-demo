import { Prospect } from "@/lib/types";
import ProspectRow from "./ProspectRow";

const stats = (prospects: Prospect[]) => [
  {
    label: "Replied",
    count: prospects.filter((p) => p.status === "replied").length,
    accent: "#00F5A0",
    bg: "rgba(0,245,160,0.08)",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "No Reply",
    count: prospects.filter((p) => p.status === "no_reply").length,
    accent: "#FF6B6B",
    bg: "rgba(255,107,107,0.08)",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Pending",
    count: prospects.filter((p) => p.status === "pending").length,
    accent: "#FFB547",
    bg: "rgba(255,181,71,0.08)",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Total",
    count: prospects.length,
    accent: "#4DD9FF",
    bg: "rgba(77,217,255,0.08)",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function ProspectsTable({ prospects }: { prospects: Prospect[] }) {
  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats(prospects).map(({ label, count, accent, bg, icon }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: bg, color: accent }}>
              {icon}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: "#0A1628" }}>{count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <p className="text-sm font-semibold" style={{ color: "#0A1628" }}>All Prospects</p>
          <div className="flex gap-2">
            {["All", "Replied", "Pending", "No Reply"].map((f) => (
              <button key={f} className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${f === "All" ? "text-white" : "text-gray-500 bg-gray-100"}`}
                style={f === "All" ? { background: "linear-gradient(135deg, #4DD9FF, #00F5A0)", color: "#0A1628" } : {}}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <table className="min-w-full">
          <thead>
            <tr style={{ backgroundColor: "#F8FAFC" }}>
              {["Name", "Company", "Status", "Engagement", "Next Action", "Last Contacted", "LinkedIn"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {prospects.map((p) => (
              <ProspectRow key={p.id} prospect={p} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
