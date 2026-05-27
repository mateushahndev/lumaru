import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { success_url, cancel_url, quantity = 1 } = await req.json();
    
    // Se quantity for 2, usa o price do bundle; senão, usa o individual
    const priceId = quantity === 2 
      ? process.env.STRIPE_BUNDLE_PRICE_ID  // price para 2 unidades
      : process.env.STRIPE_PRICE_ID;        // price para 1 unidade

    if (!priceId) {
      console.error("Missing Stripe price ID");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      allow_promotion_codes: true,
      line_items: [
        {
          price: priceId,
          quantity: 1, // O price já define se é 1 ou 2 unidades
        },
      ],
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 9 },
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      success_url: success_url || "https://lumaruskin.com/success",
      cancel_url: cancel_url || "https://lumaruskin.com",
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