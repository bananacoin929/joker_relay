import Stripe from 'stripe';

import { stripeAdmin } from '@/libs/stripe/stripe-admin';
import { getEnvVar } from '@/utils/get-env-var';
import { upsertUserSubscription } from '@/app/controller/payment/upsert-user-subscription';

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;
  const webhookSecret = getEnvVar(process.env.STRIPE_WEBHOOK_SECRET, 'STRIPE_WEBHOOK_SECRET');
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripeAdmin.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    return Response.json(`Webhook Error: ${(error as any).message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'product.created':
        case 'product.updated':
          break;
        case 'price.created':
        case 'price.updated':
          break;
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          break;
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          console.log("---- Checkout Session Completed ----");
          console.log(checkoutSession)
          if (checkoutSession.mode === 'subscription') {
            const subscriptionId = checkoutSession.subscription;
            await upsertUserSubscription({
              subscriptionId: subscriptionId as string,
              customerEmail: checkoutSession?.customer_details?.email as string,
              isCreateAction: true,
            });
          }
          break;
        default:
          throw new Error('Unhandled relevant event!');
      }
    } catch (error) {
      console.error(error);
      return Response.json('Webhook handler failed. View your nextjs function logs.', {
        status: 400,
      });
    }
  }
  return Response.json({ received: true });
}


/// Test Endpoint for subscription checkout
// export async function GET() {
//   const checkoutSession = {
//     id: 'cs_test_a1fuW8SQRQDsmPHq6r606dmBYcFwUqYNGzpRFlGa1H3rQ0NpErh0COiqnA',
//     object: 'checkout.session',
//     after_expiration: null,
//     allow_promotion_codes: null,
//     amount_subtotal: 3999,
//     amount_total: 3999,
//     automatic_tax: { enabled: false, liability: null, status: null },
//     billing_address_collection: null,
//     cancel_url: 'http://localhost:3000',
//     client_reference_id: null,
//     client_secret: null,
//     consent: null,
//     consent_collection: null,
//     created: 1725523471,
//     currency: 'gbp',
//     currency_conversion: null,
//     custom_fields: [],
//     custom_text: {
//       after_submit: null,
//       shipping_address: null,
//       submit: null,
//       terms_of_service_acceptance: null
//     },
//     customer: 'cus_QnB3pi8pLIOrPG',
//     customer_creation: 'always',
//     customer_details: {
//       address: {
//         city: null,
//         country: 'GB',
//         line1: null,
//         line2: null,
//         postal_code: 'PO16 7GZ',
//         state: null
//       },
//       email: 'mlh23110@dcobe.com',
//       name: 'sfdsfsd',
//       phone: null,
//       tax_exempt: 'none',
//       tax_ids: []
//     },
//     customer_email: null,
//     expires_at: 1725609871,
//     invoice: 'in_1PvahhP5mRjlzqJp9WQaNJgE',
//     invoice_creation: null,
//     livemode: false,
//     locale: null,
//     metadata: {},
//     mode: 'subscription',
//     payment_intent: null,
//     payment_link: null,
//     payment_method_collection: 'always',
//     payment_method_configuration_details: null,
//     payment_method_options: { card: { request_three_d_secure: 'automatic' } },
//     payment_method_types: [ 'card' ],
//     payment_status: 'paid',
//     phone_number_collection: { enabled: false },
//     recovered_from: null,
//     saved_payment_method_options: {
//       allow_redisplay_filters: [ 'always' ],
//       payment_method_remove: null,
//       payment_method_save: null
//     },
//     setup_intent: null,
//     shipping_address_collection: null,
//     shipping_cost: null,
//     shipping_details: null,
//     shipping_options: [],
//     status: 'complete',
//     submit_type: null,
//     subscription: 'sub_1PvahhP5mRjlzqJpJpac117e',
//     success_url: 'http://localhost:3000',
//     total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
//     ui_mode: 'hosted',
//     url: null
//   }

//   if (checkoutSession.mode === 'subscription') {
//     const subscriptionId = checkoutSession.subscription;
//     await upsertUserSubscription({
//       subscriptionId: subscriptionId as string,
//       customerEmail: checkoutSession.customer_details.email as string,
//       isCreateAction: true,
//     });
//   }
//   return Response.json({ status: 'success' })
// }