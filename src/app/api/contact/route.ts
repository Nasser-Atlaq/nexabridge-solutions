import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatEmailBody(
  name: string,
  email: string,
  company: string | undefined,
  service: string | undefined,
  message: string,
): string {
  return [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    service ? `Service: ${service}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, message } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    await resend.emails.send({
      from: "NexaBridge <onboarding@resend.dev>",
      to: "nexabridge.teck@gmail.com",
      replyTo: email,
      subject: `New inquiry from ${name} — ${service || "General"}`,
      text: formatEmailBody(name, email, company, service, message),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
