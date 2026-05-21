import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// IDs dos grupos MailerLite
const NEWSLETTER_GROUP_ID = "186912219589510689";
const CUSTOMERS_GROUP_ID = "187007987748963872";

interface MailerLiteSubscriber {
  id: string;
  email: string;
  groups?: string[];
}

/**
 * Busca um assinante no MailerLite pelo email (via listagem + filtro manual)
 */
async function findSubscriberByEmail(email: string): Promise<MailerLiteSubscriber | null> {
  let page = 1;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `https://connect.mailerlite.com/api/subscribers?limit=${limit}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch subscribers (page ${page}):`, await response.text());
      return null;
    }

    const data = await response.json();
    const subscribers = data.data || [];
    
    const found = subscribers.find((sub: any) => sub.email === email);
    if (found) {
      return found;
    }

    const meta = data.meta || {};
    hasMore = subscribers.length === limit && (meta.current_page || page) < (meta.last_page || page + 1);
    page++;
  }

  return null;
}

/**
 * Remove assinante do grupo Newsletter (DELETE funciona)
 */
async function removeFromNewsletterGroup(subscriberId: string): Promise<boolean> {
  const response = await fetch(
    `https://connect.mailerlite.com/api/subscribers/${subscriberId}/groups/${NEWSLETTER_GROUP_ID}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok && response.status !== 404) {
    console.error("Failed to remove from newsletter group:", await response.text());
    return false;
  }

  return true;
}

/**
 * Adiciona assinante ao grupo Customers via PUT /api/subscribers/{id}
 * ✅ CORRIGIDO: usa o endpoint principal do assinante, não /groups
 */
async function addToCustomersGroup(subscriberId: string): Promise<boolean> {
  const response = await fetch(
    `https://connect.mailerlite.com/api/subscribers/${subscriberId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groups: [CUSTOMERS_GROUP_ID],
      }),
    }
  );

  if (!response.ok) {
    console.error("Failed to update subscriber groups:", await response.text());
    return false;
  }

  return true;
}

/**
 * Cria novo assinante diretamente no grupo Customers
 */
async function createSubscriberInCustomersGroup(email: string): Promise<boolean> {
  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      groups: [CUSTOMERS_GROUP_ID],
    }),
  });

  if (!response.ok) {
    console.error("Failed to create subscriber:", await response.text());
    return false;
  }

  return true;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    console.error("Missing stripe-signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const customerEmail = session.customer_details?.email;

  if (!customerEmail) {
    console.error("No customer email found in session");
    return NextResponse.json({ received: true }, { status: 200 });
  }

  console.log(`Processing checkout for: ${customerEmail}`);

  try {
    const subscriber = await findSubscriberByEmail(customerEmail);

    if (subscriber) {
      console.log(`Found existing subscriber: ${subscriber.id}`);

      await removeFromNewsletterGroup(subscriber.id);
      await addToCustomersGroup(subscriber.id);
      console.log(`Moved ${customerEmail} from Newsletter to Customers group`);
    } else {
      console.log(`Creating new subscriber in Customers group: ${customerEmail}`);
      await createSubscriberInCustomersGroup(customerEmail);
    }

    console.log(`Successfully synced ${customerEmail}`);
  } catch (error) {
    console.error("Error syncing subscriber:", error);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}