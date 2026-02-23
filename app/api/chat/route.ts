// app/api/chat/route.ts
// Server-side proxy to the Python FastAPI backend.
// Keeps the backend URL and any secrets server-side only.

import { NextRequest, NextResponse } from "next/server"

const FASTAPI_URL =
  process.env.FASTAPI_URL ?? "http://localhost:8000"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json({ error: "message is required" }, { status: 400 })
    }

    const upstream = await fetch(`${FASTAPI_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // Abort after 30 s so the Next.js edge doesn't hang
      signal: AbortSignal.timeout(30_000),
    })

    const data = await upstream.json()

    if (!upstream.ok) {
      return NextResponse.json(
        { error: data?.detail ?? "AI backend error" },
        { status: upstream.status }
      )
    }

    return NextResponse.json(data)
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : "Unexpected error reaching AI backend"

    // Give the user an actionable hint when the backend is simply offline
    if (msg.includes("ECONNREFUSED") || msg.includes("fetch failed")) {
      return NextResponse.json(
        {
          error:
            "AI assistant is offline. Make sure the FastAPI backend is running on port 8000.",
        },
        { status: 503 }
      )
    }

    console.error("[/api/chat] upstream error:", msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
