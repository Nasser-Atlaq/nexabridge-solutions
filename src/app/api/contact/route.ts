import { NextResponse } from "next/server";

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

    // TODO: Integrate email service (Resend, SendGrid, AWS SES, etc.)
    // Example with Resend:
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "NexaBridge <noreply@nexabridge.com>",
    //   to: process.env.CONTACT_EMAIL || "hello@nexabridge.com",
    //   subject: `New inquiry from ${name} — ${service || "General"}`,
    //   text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nService: ${service || "N/A"}\n\n${message}`,
    // });

    console.log("Contact form submission:", { name, email, company, service, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
