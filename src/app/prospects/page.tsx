export const dynamic = "force-dynamic";

import { createServerClient } from "@/lib/supabase";
import ProspectsTable from "@/components/prospects/ProspectsTable";

export default async function ProspectsPage() {
  const supabase = createServerClient();
  const { data: prospects = [] } = await supabase
    .from("prospects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      {/* Page header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#0A1628" }}>Prospects</h1>
          <p className="text-sm text-gray-500 mt-1">{prospects?.length ?? 0} contacts · Last synced just now</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search prospects...
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      <ProspectsTable prospects={prospects ?? []} />
    </div>
  );
}
