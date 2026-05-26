import { NextResponse } from "next/server";

function clean(value, max = 1400) {
  return String(value || "").replace(/[<>]/g, "").trim().slice(0, max);
}

async function readPayload(request) {
  const text = await request.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    const params = new URLSearchParams(text);
    if ([...params.keys()].length > 0) {
      return Object.fromEntries(params.entries());
    }

    throw new Error("Unsupported contact payload");
  }
}

async function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { ok: false, status: 503, error: "Telegram is not configured" };
  }

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true
    })
  });

  if (!telegramResponse.ok) {
    return { ok: false, status: 502, error: "Telegram delivery failed" };
  }

  return { ok: true };
}

export async function POST(request) {
  try {
    const body = await readPayload(request);
    const name = clean(body.name, 120);
    const method = clean(body.method, 80);
    const contact = clean(body.contact, 180);

    if (!name || !method || !contact) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const text = [
      "Новая заявка P39.Studio",
      "",
      `Имя:\n${name}`,
      "",
      `Контакт:\n${method} - ${contact}`
    ].join("\n");

    const delivery = await sendTelegramMessage(text);
    if (!delivery.ok) {
      return NextResponse.json({ error: delivery.error }, { status: delivery.status });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact request failed", {
      message: error instanceof Error ? error.message : "Unknown contact error",
      contentType: request.headers.get("content-type") || ""
    });
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
