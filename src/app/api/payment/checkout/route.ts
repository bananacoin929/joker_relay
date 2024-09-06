import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });

  let data = await request.json();
  let priceId = data.priceId;
  let isTrial = data.trial;

  let session;
  if (isTrial) {
    session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      subscription_data: {
        trial_settings: {
          end_behavior: {
            missing_payment_method: "cancel",
          },
        },
        trial_period_days: 3,
      },
      success_url: process.env.SITE_URL!,
      cancel_url: process.env.SITE_URL!,
    });
  } else {
    session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: process.env.SITE_URL!,
      cancel_url: process.env.SITE_URL!,
    });
  }

  return NextResponse.json(session.url);
}
