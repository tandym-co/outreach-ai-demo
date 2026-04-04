import { createServerClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServerClient();

  const [{ data: prospect, error: pErr }, { data: messages, error: mErr }] =
    await Promise.all([
      supabase.from("prospects").select("*").eq("id", id).single(),
      supabase
        .from("messages")
        .select("*")
        .eq("prospect_id", id)
        .order("sent_at", { ascending: true }),
    ]);

  if (pErr) return NextResponse.json({ error: pErr.message }, { status: 404 });
  if (mErr) return NextResponse.json({ error: mErr.message }, { status: 500 });

  return NextResponse.json({ prospect, messages });
}
