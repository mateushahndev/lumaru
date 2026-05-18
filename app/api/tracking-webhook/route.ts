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
 * Gera a URL de tracking baseada na transportadora
 */
function getTrackingUrl(trackingNumber: string, carrier: string | null): string {
  const encoded = encodeURIComponent(trackingNumber);
  switch (carrier) {
    case "UPS":
      return `https://www.ups.com/track?tracknum=${encoded}`;
    case "USPS":
      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${encoded}`;
    case "FedEx":
      return `https://www.fedex.com/fedextrack/?trknbr=${encoded}`;
    default:
      return `https://www.google.com/search?q=track+package+${encoded}`;
  }
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

  // Template HTML do email de rastreio (você pode personalizar depois)
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Order Has Shipped</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; border-bottom: 1px solid #eee; }
        .logo { font-size: 24px; font-weight: bold; color: #B5A5D1; }
        .content { padding: 30px 0; }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #B5A5D1;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          margin: 20px 0;
        }
        .footer { text-align: center; padding-top: 20px; font-size: 12px; color: #888; border-top: 1px solid #eee; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">lumaru</div>
        </div>
        <div class="content">
          <h2>Your Order Has Shipped! 🎉</h2>
          ${customerName ? `<p>Hello ${customerName},</p>` : "<p>Hello,</p>"}
          <p>Great news! Your Lumaru order ${orderNumber ? `#${orderNumber} ` : ""}is on its way.</p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
            <p><strong>Carrier:</strong> ${carrierName}</p>
          </div>
          
          <p>Click the button below to track your package:</p>
          
          <div style="text-align: center;">
            <a href="${trackingUrl}" class="button" style="color: white;">Track Your Package →</a>
          </div>
          
          <p>Your Awake Eye Complex will arrive in 3-7 business days. If you have any questions, just reply to this email.</p>
          
          <p>Warmly,<br>The Lumaru Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2025 Lumaru. All rights reserved.</p>
          <p><a href="https://lumaruskin.com/privacy" style="color: #888;">Privacy Policy</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textBody = `
Your Order Has Shipped!

${customerName ? `Hello ${customerName},` : "Hello,"}

Great news! Your Lumaru order ${orderNumber ? `#${orderNumber} ` : ""}is on its way.

Tracking Number: ${trackingNumber}
Carrier: ${carrierName}

Track your package here: ${trackingUrl}

Your Awake Eye Complex will arrive in 3-7 business days.

Warmly,
The Lumaru Team
  `;

  await resend.emails.send({
    from: "Lumaru <onboarding@resend.dev>", // Ajuste para seu domínio
    to: [customerEmail],
    subject: `Your Lumaru Order Has Shipped ${orderNumber ? `(#${orderNumber})` : ""}`,
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