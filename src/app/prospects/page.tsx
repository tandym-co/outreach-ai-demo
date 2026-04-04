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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Prospects</h1>
        <p className="text-sm text-gray-500 mt-1">{prospects?.length ?? 0} total</p>
      </div>
      <ProspectsTable prospects={prospects ?? []} />
    </div>
  );
}
