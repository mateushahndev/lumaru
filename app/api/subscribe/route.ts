import { NextRequest, NextResponse } from "next/server";

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID || "YOUR_GROUP_ID";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!MAILERLITE_API_KEY) {
      console.error("MailerLite API key not configured");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        groups: MAILERLITE_GROUP_ID ? [MAILERLITE_GROUP_ID] : [],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("MailerLite error:", data);
      return NextResponse.json(
        { message: data.message || "Failed to subscribe" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Subscribed successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}