import { NextResponse } from "next/server";

function clean(value, max = 1400) {
  return String(value || "").replace(/[<>]/g, "").trim().slice(0, max);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = clean(body.name, 120);
    const method = clean(body.method, 80);
    const contact = clean(body.contact, 180);

    if (!name || !method || !contact) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json({ error: "Telegram is not configured" }, { status: 503 });
    }

    const text = [
      "Новая заявка P39.Studio",
      "",
      `Имя:\n${name}`,
      "",
      `Контакт:\n${method} - ${contact}`
    ].join("\n");

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
      return NextResponse.json({ error: "Telegram delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
