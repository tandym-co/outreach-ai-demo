import { createServerClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("persona")
    .select("description")
    .eq("id", 1)
    .single();

  if (error) return NextResponse.json({ description: "Professional B2B sales rep" });
  return NextResponse.json({ description: data.description });
}

export async function POST(req: Request) {
  const { description } = await req.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("persona")
    .upsert({ id: 1, description, updated_at: new Date().toISOString() })
    .select("description")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ description: data.description });
}
