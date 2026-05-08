import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Inicializa o Stripe com a chave secreta (sem fixar versão)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { success_url, cancel_url } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: success_url || "https://lumaruskin.com/success",
      cancel_url: cancel_url || "https://lumaruskin.com",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 747,
              currency: "usd",
            },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}