import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function getStatsEndpoint() {
  return process.env.P39_STATS_ENDPOINT || "http://127.0.0.1:3939/event";
}

export async function POST(request) {
  try {
    const body = await request.text();
    const response = await fetch(getStatsEndpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false }, { status: 202 });
    }

    const result = await response.json().catch(() => ({ ok: true }));
    return NextResponse.json(result);
  } catch (error) {
    console.error("P39Stats event failed", error);
    return NextResponse.json({ ok: false }, { status: 202 });
  }
}
