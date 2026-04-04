export const dynamic = "force-dynamic";

import { createServerClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import StatusBadge from "@/components/prospects/StatusBadge";
import MessageThread from "@/components/messages/MessageThread";

export default async function ProspectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServerClient();

  const [{ data: prospect }, { data: messages }] = await Promise.all([
    supabase.from("prospects").select("*").eq("id", id).single(),
    supabase
      .from("messages")
      .select("*")
      .eq("prospect_id", id)
      .order("sent_at", { ascending: true }),
  ]);

  if (!prospect) notFound();

  return (
    <div className="p-8 max-w-2xl">
      <Link href="/prospects" className="text-sm text-indigo-600 hover:underline mb-4 block">
        ← Back to Prospects
      </Link>

      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{prospect.name}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{prospect.company}</p>
          </div>
          <StatusBadge status={prospect.status} />
        </div>
        <div className="mt-4 text-sm text-gray-500 space-y-1">
          {prospect.linkedin_url && (
            <p>
              <span className="font-medium text-gray-700">LinkedIn: </span>
              <a href={prospect.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
                {prospect.linkedin_url}
              </a>
            </p>
          )}
          {prospect.last_contacted && (
            <p>
              <span className="font-medium text-gray-700">Last contacted: </span>
              {prospect.last_contacted}
            </p>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg border p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Message Thread</h2>
        <MessageThread messages={messages ?? []} />
      </div>
    </div>
  );
}
