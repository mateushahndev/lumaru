import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Configuração do webhook (opcional: segredo para validação)
const WEBHOOK_SECRET = process.env.TRACKING_WEBHOOK_SECRET;

// Interface para os dados extraídos do email da Selfnamed
interface ExtractedData {
  trackingNumber: string;
  carrier: "UPS" | "USPS" | "FedEx" | null;
  customerEmail: string;
  customerName?: string;
  orderNumber?: string;
}

/**
 * Extrai os dados do corpo do email da Selfnamed
 * Ajuste as regex conforme o formato real do email
 */
function extractTrackingData(emailBody: string): ExtractedData | null {
  // Padrões comuns de tracking number (ajustar conforme necessidade)
  const patterns = {
    trackingNumber: [
      /Tracking Number:\s*([A-Z0-9]+)/i,
      /Tracking #:\s*([A-Z0-9]+)/i,
      /TRK#:\s*([A-Z0-9]+)/i,
      /Tracking ID:\s*([A-Z0-9]+)/i,
      /\b(1Z[A-Z0-9]{16})\b/i, // UPS
      /\b(9\d{21})\b/i, // USPS
      /\b(\d{12,15})\b/i, // FedEx
    ],
    carrier: [
      /Carrier:\s*(\w+)/i,
      /Shipped via:\s*(\w+)/i,
    ],
    customerEmail: [
      /Customer Email:\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i,
      /Email:\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i,
    ],
    customerName: [
      /Customer Name:\s*(.+)/i,
      /Name:\s*(.+)/i,
    ],
    orderNumber: [
      /Order #:\s*([A-Z0-9-]+)/i,
      /Order Number:\s*([A-Z0-9-]+)/i,
    ],
  };

  let trackingNumber = "";
  let carrier: "UPS" | "USPS" | "FedEx" | null = null;
  let customerEmail = "";
  let customerName = "";
  let orderNumber = "";

  // Extrair tracking number
  for (const pattern of patterns.trackingNumber) {
    const match = emailBody.match(pattern);
    if (match) {
      trackingNumber = match[1];
      break;
    }
  }

  // Detectar carrier baseado no tracking number (fallback)
  if (trackingNumber) {
    if (/^1Z[A-Z0-9]{16}$/i.test(trackingNumber)) {
      carrier = "UPS";
    } else if (/^9\d{21}$/.test(trackingNumber)) {
      carrier = "USPS";
    } else if (/^\d{12,15}$/.test(trackingNumber)) {
      carrier = "FedEx";
    }
  }

  // Extrair carrier do texto
  for (const pattern of patterns.carrier) {
    const match = emailBody.match(pattern);
    if (match && !carrier) {
      const carrierName = match[1].toLowerCase();
      if (carrierName.includes("ups")) carrier = "UPS";
      else if (carrierName.includes("usps")) carrier = "USPS";
      else if (carrierName.includes("fedex")) carrier = "FedEx";
      break;
    }
  }

  // Extrair email do cliente
  for (const pattern of patterns.customerEmail) {
    const match = emailBody.match(pattern);
    if (match) {
      customerEmail = match[1];
      break;
    }
  }

  // Extrair nome do cliente
  for (const pattern of patterns.customerName) {
    const match = emailBody.match(pattern);
    if (match) {
      customerName = match[1].trim();
      break;
    }
  }

  // Extrair número do pedido
  for (const pattern of patterns.orderNumber) {
    const match = emailBody.match(pattern);
    if (match) {
      orderNumber = match[1];
      break;
    }
  }

  if (!trackingNumber || !customerEmail) {
    console.error("Failed to extract required data:", { trackingNumber, customerEmail });
    return null;
  }

  return {
    trackingNumber,
    carrier,
    customerEmail,
    customerName: customerName || undefined,
    orderNumber: orderNumber || undefined,
  };
}

/**
 * Gera a URL de tracking para a página do Lumaru
 */
function getTrackingUrl(trackingNumber: string, carrier: string | null): string {
  const carrierParam = carrier ? carrier.toLowerCase() : "";
  return `https://lumaruskin.com/track-order?number=${encodeURIComponent(trackingNumber)}&carrier=${carrierParam}`;
}

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
  const trackingUrl = getTrackingUrl(trackingNumber, carrier);
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
    from: "Lumaru <hello@lumaruskin.com>",
    to: [customerEmail],
    subject: `Your Awake Eye Complex is on its way ✨`,
    html: htmlBody,
    text: textBody,
  });
}

export async function POST(req: NextRequest) {
  try {
    // Verificar segredo do webhook (opcional)
    const authHeader = req.headers.get("authorization");
    if (WEBHOOK_SECRET && authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await req.json();

    // Verificar se é um evento de email recebido do Resend
    if (payload.type !== "email.received") {
      return NextResponse.json({ message: "Ignored: not an email.received event" }, { status: 200 });
    }

    const emailData = payload.data;
    const emailBody = emailData.text_body || emailData.html_body || "";

    if (!emailBody) {
      console.error("No email body found in webhook payload");
      return NextResponse.json({ error: "No email body" }, { status: 400 });
    }

    // Extrair dados do email
    const extracted = extractTrackingData(emailBody);

    if (!extracted) {
      console.error("Failed to extract tracking data from email");
      return NextResponse.json({ error: "Failed to extract tracking data" }, { status: 400 });
    }

    // Enviar email de rastreio para o cliente
    await sendTrackingEmail(
      extracted.customerEmail,
      extracted.customerName,
      extracted.trackingNumber,
      extracted.carrier,
      extracted.orderNumber
    );

    console.log(`Tracking email sent to ${extracted.customerEmail} for order ${extracted.orderNumber || "unknown"}`);

    return NextResponse.json({ success: true, trackingNumber: extracted.trackingNumber }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}