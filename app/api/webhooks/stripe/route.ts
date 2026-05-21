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
 * Busca um assinante no MailerLite pelo email
 */
async function findSubscriberByEmail(email: string): Promise<MailerLiteSubscriber | null> {
  const response = await fetch(
    `https://connect.mailerlite.com/api/subscribers?filter[email]=${encodeURIComponent(email)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.error("Failed to search subscriber:", await response.text());
    return null;
  }

  const data = await response.json();
  const subscribers = data.data || [];
  return subscribers.length > 0 ? subscribers[0] : null;
}

/**
 * Remove assinante do grupo Newsletter
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

  if (!response.ok) {
    console.error("Failed to remove from newsletter group:", await response.text());
    return false;
  }

  return true;
}

/**
 * Adiciona assinante ao grupo Customers
 */
async function addToCustomersGroup(subscriberId: string): Promise<boolean> {
  const response = await fetch(
    `https://connect.mailerlite.com/api/subscribers/${subscriberId}/groups`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groups: [CUSTOMERS_GROUP_ID] }),
    }
  );

  if (!response.ok) {
    console.error("Failed to add to customers group:", await response.text());
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

/**
 * Webhook do Stripe para sincronizar compras com MailerLite
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    console.error("Missing stripe-signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Verificar assinatura do webhook
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Só processar eventos de checkout completo
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
    // Buscar assinante no MailerLite
    const subscriber = await findSubscriberByEmail(customerEmail);

    if (subscriber) {
      // Assinante existe: remover do Newsletter e adicionar ao Customers
      console.log(`Found existing subscriber: ${subscriber.id}`);

      // Remover do grupo Newsletter (se estiver nele)
      const removed = await removeFromNewsletterGroup(subscriber.id);
      if (removed) {
        console.log(`Removed ${customerEmail} from Newsletter group`);
      }

      // Adicionar ao grupo Customers
      const added = await addToCustomersGroup(subscriber.id);
      if (added) {
        console.log(`Added ${customerEmail} to Customers group`);
      }
    } else {
      // Assinante não existe: criar diretamente no grupo Customers
      console.log(`Creating new subscriber in Customers group: ${customerEmail}`);
      await createSubscriberInCustomersGroup(customerEmail);
    }

    console.log(`Successfully synced ${customerEmail} to Customers group`);
  } catch (error) {
    // Log do erro, mas retornamos 200 para o Stripe
    // Isso evita que o Stripe reenvie o webhook repetidamente
    console.error("Error syncing subscriber:", error);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}