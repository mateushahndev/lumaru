import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Envia email de rastreio para o cliente via Resend
 */
async function sendTrackingEmail(
  customerEmail: string,
  customerName: string | undefined,
  trackingNumber: string,
  carrier: string | null,
  orderNumber: string | undefined
): Promise<void> {
  const carrierParam = carrier ? carrier.toLowerCase() : "";
  const trackingUrl = `https://lumaruskin.com/track-order?number=${encodeURIComponent(trackingNumber)}&carrier=${carrierParam}`;
  const carrierName = carrier || "carrier";
  const displayName = customerName || "there";

  // Template HTML do email de rastreio (estilo Lumaru)
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Lumaru order has shipped</title>
      <style>
        body {
          font-family: Georgia, 'Times New Roman', Times, serif;
          line-height: 1.5;
          background-color: #FEFEFE;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 560px;
          margin: 0 auto;
          padding: 40px 24px;
          background-color: #FEFEFE;
        }
        .header {
          text-align: center;
          padding-bottom: 24px;
          border-bottom: 1px solid #E8E2F0;
        }
        .logo {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #1A1A1A;
          text-decoration: none;
        }
        .content {
          padding: 32px 0;
          color: #1A1A1A;
        }
        .greeting {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 24px;
        }
        .message {
          font-size: 16px;
          color: #444;
          margin-bottom: 24px;
        }
        .tracking-box {
          background-color: #F8F6FA;
          padding: 20px;
          border-radius: 12px;
          margin: 28px 0;
          text-align: center;
        }
        .tracking-number {
          font-family: monospace;
          font-size: 14px;
          color: #666;
          word-break: break-all;
        }
        .button {
          display: inline-block;
          background-color: #B5A5D1;
          color: white;
          text-decoration: none;
          padding: 12px 28px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 500;
          margin: 16px 0;
          transition: background-color 0.2s;
        }
        .button:hover {
          background-color: #9B89B8;
        }
        .info-text {
          font-size: 14px;
          color: #888;
          margin-top: 16px;
        }
        .footer {
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid #E8E2F0;
          font-size: 12px;
          color: #aaa;
        }
        .footer a {
          color: #B5A5D1;
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }
        @media (max-width: 600px) {
          .container {
            padding: 24px 20px;
          }
          .button {
            padding: 10px 24px;
            font-size: 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">lumaru</div>
        </div>
        <div class="content">
          <div class="greeting">
            Proof you slept well.<br>Even when you didn't. ✨
          </div>
          
          <p class="message">Hi ${displayName},</p>
          
          <p class="message">Your Micro-Circulation Awakening Complex is on its way to meet your under-eyes. Finally, an eye cream that does what it says.</p>
          
          <div class="tracking-box">
            <p style="margin-bottom: 8px; font-weight: 500;">Your tracking number</p>
            <p class="tracking-number"><strong>${trackingNumber}</strong></p>
            <p style="font-size: 13px; color: #888; margin-top: 8px;">Carrier: ${carrierName}</p>
          </div>
          
          <div style="text-align: center;">
            <a href="${trackingUrl}" class="button">Track Your Package →</a>
          </div>
          
          <p class="info-text">Expect delivery in 5-12 business days. You'll be able to see real-time updates once the carrier scans your package.</p>
          
          <p class="message" style="margin-top: 28px;">Your under-eyes are about to look as rested as you feel.</p>
          
          <p class="message" style="margin-top: 24px;">
            Questions? <a href="https://lumaruskin.com/contact" style="color: #B5A5D1;">We're here to help</a>.
          </p>
          
          <p class="message" style="margin-top: 32px;">
            Warmly,<br>The Lumaru Team
          </p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Lumaru. All rights reserved.</p>
          <p>
            <a href="https://lumaruskin.com/privacy">Privacy</a> &nbsp;|&nbsp;
            <a href="https://lumaruskin.com/terms">Terms</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Versão texto plano
  const textBody = `
Proof you slept well. Even when you didn't. ✨

Hi ${displayName},

Your Micro-Circulation Awakening Complex is on its way to meet your under-eyes. Finally, an eye cream that does what it says.

---

Tracking Number: ${trackingNumber}
Carrier: ${carrierName}

Track your package here: ${trackingUrl}

---

Expect delivery in 5-12 business days. You'll be able to see real-time updates once the carrier scans your package.

Your under-eyes are about to look as rested as you feel.

Questions? We're here to help: https://lumaruskin.com/contact

Warmly,
The Lumaru Team

© ${new Date().getFullYear()} Lumaru
Privacy: https://lumaruskin.com/privacy
Terms: https://lumaruskin.com/terms
  `;

  await resend.emails.send({
    from: "Lumaru <tracking@lumaruskin.com>",
    to: [customerEmail],
    subject: `Your Awake Eye Complex is on its way ✨`,
    html: htmlBody,
    text: textBody,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { trackingNumber, carrier, customerEmail, customerName, orderNumber } = body;

    // Validação dos campos obrigatórios
    if (!trackingNumber || !customerEmail) {
      console.error("Missing required fields:", { trackingNumber, customerEmail });
      return NextResponse.json(
        { error: "Missing required fields: trackingNumber and customerEmail" },
        { status: 400 }
      );
    }

    // Enviar email de rastreio para o cliente
    await sendTrackingEmail(
      customerEmail,
      customerName,
      trackingNumber,
      carrier || null,
      orderNumber
    );

    console.log(`Tracking email sent to ${customerEmail} for order ${orderNumber || "unknown"}`);

    return NextResponse.json(
      { 
        success: true, 
        trackingNumber,
        message: `Tracking email sent to ${customerEmail}` 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Manual tracking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}